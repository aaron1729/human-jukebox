let myAuthVariable = 21;


opener.console.log('here\'s a console.log from the opened window, where myAuthVariable is: ', myAuthVariable);

// obviously, the arguments below are hard-coded. these should instead be made into variables.
opener.toPrivate("aaron1729", "BQDlJQS-0uYCNp-TKDVZQGT6wOv7Pv8YAwnesJq2R2NI4eHF_OjbHkB3m4GWvKpXx3SbuH9ncDSGKsohp082iYgzrTCLlJleM7L0q2HPS3obBYRcPnjUXHYQk5x-NkaFQgaz1FUNvjpWHbkuKGhMXlhIGD8tV9zcNeZt2RYTtB69I_TIajfWunjBbnc");

opener.testFunc(false);



setTimeout(window.close, 1000);