const cp = require("child_process");
const { setArguments } = require("./argumentProcess");

// Sudo Password
const sudoPassword = "123456";
// PulseAudio command
const pulse = "pulseaudio -D";
// Outputs
const hdmiOutput = "alsa_output.pci-0000_01_00.1.hdmi-stereo-extra1";
const btOutput = "bluez_sink.38_18_4C_59_A1_89.a2dp_sink";

const init = async () => {
  setArguments(["-sudo", "-cmd", "-hdmi"], process.argv).then((res) => {
    console.log("CHECKK:", res);
    try {
      // console.log(res["-sudo"], res["-cmd"], res["-hdmi"]);
      return func(res["-sudo"], res["-cmd"], res["-hdmi"]);
    } catch (err) {
      throw console.log("Error : ", err);
    }
  });
};

init();

function func(sudoPass, sudoCMD, output) {
  // Options
  const exec_options = {
    cwd: null,
    env: null,
    encoding: "utf8",
    timout: 0,
    maxBuffer: 200 * 1025,
    killSignal: "SIGTERM",
  };

  const spawn_options = {
    cwd: null,
    env: null,
    detached: false,
  };

  const password = sudoPass !== undefined ? sudoPass : sudoPassword;
  const sudoCommand = sudoCMD !== undefined ? sudoCMD : pulse;
  const isHdmiBT =
    output === "yes" ? hdmiOutput : output === "bt" ? btOutput : output;
  const out = output !== undefined ? isHdmiBT : hdmiOutput;
  console.log(out);
  try {
    const sudoPulseAudio = cp.spawnSync("sh", [
      "-c",
      `echo ${password} | sudo -S ${sudoCommand}`,
      spawn_options,
    ]);

    console.log("pulseAudio running...");
    console.log(sudoPulseAudio.stdout.toString());
    console.log(sudoPulseAudio.stderr.toString());
    console.log("pulseAudio Done!");

    console.log("setting default output HDMI");
    cp.exec(`pacmd set-default-sink ${out}`, (isError, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);

      console.log("DONE !");
    });
  } catch (err) {
    throw console.log("Error: Something went wrong !!");
  }
}

// pactl list short sinks
// 28	alsa_output.pci-0000_00_1f.3.analog-stereo	module-alsa-card.c	s16le 2ch 44100Hz	SUSPENDED
// 41	alsa_output.pci-0000_01_00.1.hdmi-stereo-extra1	module-alsa-card.c	s16le 2ch 44100Hz	SUSPENDED

// pacmd set-default-sink "alsa_output.pci-0000_01_00.1.hdmi-stereo-extra1"
// alsa_output.pci-0000_00_1f.3.analog-stereo

// Bluetooth headset
// bluez_sink.38_18_4C_59_A1_89.a2dp_sink
// hdmi
// alsa_output.pci-0000_01_00.1.hdmi-stereo-extra1
