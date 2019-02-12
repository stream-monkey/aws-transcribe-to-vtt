# aws-transcribe-to-vtt

Takes the JSON from [Amazon AWS Transcribe](https://aws.amazon.com/transcribe/) and outputs a VTT file.

## api

```javascript
vttConvert(json);
```

`json` is a string consisting of JSON returned from Amazon's transcribe service

returns a string consisting of the `vtt` file.


## usage

```javascript
const vttConvert = require('aws-transcribe-to-vtt');

const json = '{ }'; // the JSON from AWS transcribe service here

const vtt = vttConvert(json);  // vtt 


```

## testing
```javascript
node test
```

## command line usage

```bash
node index.js
```

There is a Firefox webdriver for MacOS included to test the outputted VTT file, which will prompt for a link to the video and display the video with subtitles on a temporary local server. If you would like to test on a different operating system, follow the documentation [here](https://www.npmjs.com/package/selenium-webdriver) to replace the driver on your system [PATH](http://en.wikipedia.org/wiki/PATH_%28variable%29).

The outputted VTT file is saved to `output/output.vtt`. Easiest way to run is place the JSON from AWS inside the root folder, and then simply type the name of the file when you are running the utility.


## Contributing:
Contributors are more than welcome! Just fork and create pull requests.
