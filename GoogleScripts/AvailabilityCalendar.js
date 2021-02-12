/*========================TODO===============================================
 *
 * Feature ~ Multi-day & full day implementation
 * Feature ~ Classify busy days
 * Feature ~ Guards against writing for other users.
 * Performance ~ Dates can return ranges to minimize sheet calls
 * 
 * ==========================================================================*/

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var id = "jb.lambert23@gmail.com";
var cal = CalendarApp.getCalendarById(id);
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheets = ss.getSheets();

function getTime(date) {
  var time = date.toLocaleTimeString().split(/[\s:]+/);
  return time[0] + ':' + time[1] + ' ' + time[3];
}

function formatEvent(title, startTime, endTime) {
  return title + ' (' + getTime(startTime) + ' - ' + getTime(endTime) + ')';
}

function getDates(sheet) {
  var dates = {};
  var columns = 0;
  
  sheet.getRange(1, 1, sheet.getLastRow()).getValues().forEach(function(val, i) {
    if (val == 'Date')
      columns = i+2;
    
    else if (val == 'Justin') {
      sheet.getRange(columns, 2, 1, sheet.getLastColumn()).getValues()[0].forEach(function(date, j) {
        if (date != '') {
          dates[date] = {
            'row': i + 1,
            'column': j + 2
          }
        }
      });
    }
  });
  
  return dates;
}

function getEvents(events) {
  es = {};
  minStart = {};

  events.forEach(function(e) {
    var eventStart = e.getStartTime();
    var eventEnd = e.getEndTime();
    var eventDate = eventStart.getDate();

    // Multi-day events are not supported.
    if (eventDate != eventEnd.getDate()) {
      return;
    }
    else if (e.getTitle() == 'D&D' && e.getLocation() == 'Home') {
      es[eventDate] = formatEvent(e.getTitle(), eventStart, eventEnd);
    }
    else {
      if (!minStart[eventDate]) 
        minStart[eventDate] = eventStart;
      else if (eventStart < minStart[eventDate])
        minStart[eventDate] = new Date(eventStart);
        
      es[eventDate] = formatEvent('Busy', minStart[eventDate], eventEnd);
    }
  });

  return es;
}

function main() {
  sheets.forEach(function(sheet) {
    if (sheet.getName().toLowerCase().indexOf('do not use') > -1) {
      return;
    }

    var monthYear = sheet.getName().split(" ");
    var monthBeginning = new Date(monthYear[1], months.indexOf(monthYear[0], 1));
    var monthEnd = new Date(monthYear[1], months.indexOf(monthYear[0]) + 1, 1);
    var events = cal.getEvents(monthBeginning, monthEnd);
    var dates = getDates(sheet);
    var outputs = getEvents(events);

    for(date in dates) {
      var output = date in outputs ? outputs[date] : '';
      sheet.getRange(dates[date]['row'], dates[date]['column']).setValue(output);
    }
  });
}
