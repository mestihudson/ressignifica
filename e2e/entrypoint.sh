#!/bin/sh -x
which curl > /dev/null || (apk update && apk add curl)
retries="${RETRIES:-10}"
interval="${INTERVAL:-10s}"
while [ true ]; do
  if [ $retries -gt 0 ]; then
    result="$(curl -s http://ressignifica-ui:3000 > /dev/null && curl -s http://ressignifica-api:4000 > /dev/null && nc -z ressignifica-db 5432 && curl -s http://ressignifica-hub:4444 > /dev/null && curl -s http://ressignifica-chrome:5555 > /dev/null && curl -s http://ressignifica-firefox:5555 > /dev/null && echo ok || echo fail)"
    if [ $result = "fail" ]; then
      sleep $interval
    else
      export
      yarn install
      export BROWSER=chrome
      yarn e2e
      export BROWSER=firefox
      yarn e2e
      exit 0
    fi
    retries=$((retries - 1))
  else
    exit 1
  fi
done

