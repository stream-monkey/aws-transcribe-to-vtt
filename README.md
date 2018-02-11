# aws-transcribe-to-vtt

This utility takes the JSON from [Amazon AWS Transcribe](https://aws.amazon.com/transcribe/) and outputs a VTT file. There is a Firefox webdriver for MacOS included to test the outputted VTT file, which will prompt for a link to the video and display the video with subtitles on a temporary local server. If you would like to test on a different operating system, follow the documentation [here](https://www.npmjs.com/package/selenium-webdriver) to replace the driver on your system [PATH](http://en.wikipedia.org/wiki/PATH_%28variable%29).

The outputted VTT file is saved to `output/output.vtt`. Easiest way to run is place the JSON from AWS inside the root folder, and then simply type the name of the file when you are running the utility.

## Running:
### To test:
    node test

### To run
    node index.js
