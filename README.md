# Switch Audio Output to HDMI to BT

## its for Linux (tested and working on Ubuntu 20)

### Commands

-sudo | -cmd | -hdmi

example run:

- node index.js

that will run with default variables in index.js

#### -sudo command

by default change "sudoPassword" variable in index.js

- node index.js -sudo="<your-sudo-password>"

#### -hdmi command

by default it switches to Hdmi output.
change the default hdmi and Bluettoth output in index.js
const hdmiOutput
const btOutput

To swith to Hdmi

- node index.js -hdmi=yes
- node index.js

To Switch to Bluetooth

- node index.js -hdmi=bt

To provide your own pacmd set-default-sink output

- node index.js -hdmi="<manual-output>"

### Change the default varriables in index.js

const sudoPassword
const hdmiOutput
const btOutput
