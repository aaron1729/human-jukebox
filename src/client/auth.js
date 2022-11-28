let myAuthVariable = 21;

opener.console.log('here\'s a console.log from the opened window, where myAuthVariable is: ', myAuthVariable);

// obviously, the arguments below are hard-coded. these should instead be made into variables.
opener.toPrivate("aaron1729", "abc");

setTimeout(window.close, 1000);