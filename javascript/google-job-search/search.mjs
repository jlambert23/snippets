#!/usr/bin/node

const requests = [];

for (let i = 1; i <= 10; i++) {
  requests.push(
    fetch(
      `https://careers.google.com/api/v3/search/?distance=50&q=%22senior%20software%20engineer%22&page=${i}`,
      {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uX2tleSI6NTM3Mzk5ODkxODc5NTI2NH0.ewkl51YXvhGshhGJscbnl6tZ37ylsEg3N408kiIfhQI',
          'sec-ch-ua':
            '" Not A;Brand";v="99", "Chromium";v="98", "Sidekick";v="98"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-client-data': 'CJ2NywE=',
          'x-csrftoken':
            'sG1DMags5Kz5j58hmla09CVd9jLXQfY5EvMWa0oEkNmToQwveOCGwz4aLgRlTIIn',
          cookie:
            'OGP=-19025996:-19025836:; HSID=ArfExwVZMEre7KH3B; SSID=ADGQV-F_lYyzCNELN; APISID=TdspvJqeSdxI0D4n/AsgKEzny1kB_d9fKC; SAPISID=Ucauya19-nWRKN1x/AM-E4Ng5X1pXApvWM; __Secure-1PAPISID=Ucauya19-nWRKN1x/AM-E4Ng5X1pXApvWM; __Secure-3PAPISID=Ucauya19-nWRKN1x/AM-E4Ng5X1pXApvWM; __Secure-1PSIDCC=AJi4QfHLAV9eIlLRQ1NlXtOyyyTyQdLv9FYOIOyIt-IouenU0IDCHahYxW5286kGFn47WmxMuw; OGPC=19025996-1:19025836-2:19029345-1:; SEARCH_SAMESITE=CgQItJUB; S=billing-ui-v3=n_cZhsL8O66lOFaIrVw5ANKeaL6oZ8Gb:billing-ui-v3-efe=n_cZhsL8O66lOFaIrVw5ANKeaL6oZ8Gb; SID=KAhDH-6o4s5LWC7svrNwYDzJOm-zMpsYwCy3bC-QCt0bxXoc0jpP5q947YW-UeWmMu4Lfw.; __Secure-1PSID=KAhDH-6o4s5LWC7svrNwYDzJOm-zMpsYwCy3bC-QCt0bxXocL4Zc5JaI6O7Ef-I3vZPaig.; __Secure-3PSID=KAhDH-6o4s5LWC7svrNwYDzJOm-zMpsYwCy3bC-QCt0bxXocz6CjINH5K5I8_dWHtW20ig.; NID=511=f9I99_yuFLsQsb5OrzvR49FAYiKMOYkv0AKy89bGXbtPeLjunc4caleLqWvvBlRhzMeC67e8MQybWku384g_-JCtuX48sv3TRLS2w5zTB0Vc71neaxja9MUdQwuSZlRc2D_0W_TQNQ2PcTI463gta_WC2hqp50f33YHlxDr4CyB8gkdHs-KMtdwfznI-MXJZVBIPobtsZD387KdtDLXKvZH2EngnMF8mbqEOxWCsRqmRo3qq414_ZN8Qu_Ig0Wm21EJsn-TvGLeSL2Mrtel855E1-meLRAzSxQ2U93L1r8QDhMPUgzQAsCJy4b5qTzxp9FKhCl6Ncl8FQemTjoroQ3sabmYhzhiwAstYyqnCyipf4O6hKpRtef6DGlSZMUR3JKRG9g; G_ENABLED_IDPS=google; G_AUTHUSER_H=0; 1P_JAR=2022-05-26-19; AEC=AakniGOmY6Zy6-R9jwBVQgJ6kt5kf2USEFG-V8YcNnW9MrD1kwlDrXi0-OY; SIDCC=AJi4QfFYyQ2aOyDAFsL32JOvLh38mW8C8uvIwHZVH2g_BinDjsMxdAduY-yLvOYGoF3StzWmAHg; __Secure-3PSIDCC=AJi4QfH2E2yG1dbXTg75itWSEOnUPIkRXiVtZgAaW1HxZmtzj9-aLCxP3hncBTsu4aFJZ6lkZLg',
          Referer:
            'https://careers.google.com/jobs/results/?distance=50&q=%22senior%20software%20engineer%22',
          'Referrer-Policy': 'same-origin',
        },
        body: null,
        method: 'GET',
      }
    ).then((res) => res.json())
  );
}

const res = await Promise.all(requests);
const r = res.reduce((acc, r) => {
  acc.push(...r.jobs);
  return acc;
}, []);
const jobs = r.map((j) => {
  return {
    id: j.id,
    title: j.title,
    apply_url: j.apply_url,
    locations: j.locations.map((l) => l.display),
    has_remote: j.has_remote,
  };
});

import fs from 'fs';
fs.writeFileSync('./jobs.json', JSON.stringify(jobs, null, 2));
