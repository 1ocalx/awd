import { addPreEditListener, addPreSendListener, MessageObject, removePreEditListener, removePreSendListener } from "@api/MessageEvents";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";


const settings = definePluginSettings({
    enablePrefix: {
        description: "Enabled",
        type: OptionType.BOOLEAN,
        default: false,
        restartNeeded: false
    },
    messagePrefix: {
        description: "Prefix",
        type: OptionType.STRING,
        default: "",
        restartNeeded: false
    }
});


export default definePlugin({
    name: "PrefixEverything",
    description: "Adds a specified prefix to every message sent.",
    authors: [{ name: "Boyangsic", id: 1205826190770831380n }],
    dependencies: ["MessageEventsAPI"],
    settings,



    onSend(msg: MessageObject) {

        if (settings.store.enablePrefix) {
            msg.content = settings.store.messagePrefix + msg.content;
        }
    },

    start() {
        this.preSend = addPreSendListener((_, msg) => this.onSend(msg));
        this.preEdit = addPreEditListener((_cid, _mid, msg) => this.onSend(msg));
    },

    stop() {
        removePreSendListener(this.preSend);
        removePreEditListener(this.preEdit);
    },
});
