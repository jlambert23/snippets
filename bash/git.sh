#!/usr/bin/env bash

gitc () {
  RED='\033[0;33m'
  NC='\033[0m' # No Color
  for x in `ls $1`; do
    printf "${RED}$x${NC}\n"
    git -C $PWD/$1/$x ${@:2}
    echo
  done
}

### Mac Configs ###

# Enable Git auto-complete
autoload -Uz compinit && compinit

# Load colors
autoload -U colors && colors

# Load version control information
autoload -Uz vcs_info
precmd() { vcs_info }

# Format the vcs_info_msg_0_ variable
zstyle ':vcs_info:git:*' formats '(%b) '
 
# Set up the prompt (with git branch name)
setopt PROMPT_SUBST
PROMPT='%n@${PWD/#$HOME/~} %{$fg[yellow]%}% ${vcs_info_msg_0_}%{$reset_color%}% > '
