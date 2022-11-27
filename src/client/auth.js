let myAuthVariable = 12;

opener.loggit('hello from the opened tab, where myAuthVariable is: ' + myAuthVariable);

setTimeout(window.close, 3000);