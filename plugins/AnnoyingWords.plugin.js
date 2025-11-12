/**
 * @name Annoying Words
 * @version 1.0.0
 * @description Hide messages containing annoying words (client-side only). Like Twitter/X mute.
 * @author explysm
 */

import { Devs } from "@utils";
import definePlugin from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { SettingsStore } from "@api/Settings";
import { FluxDispatcher, Patcher } from "@webpack/common";
import { Toasts } from "@webpack/common";

const MessageModule = findByPropsLazy("sendMessage", "receiveMessage");
const Dispatcher = findByPropsLazy("dispatch", "subscribe");

export default definePlugin({
  name: "Annoying Words",
  description: "Hide messages with annoying words.",
  authors: [{ name: "explysm", id: 0n }],

  defaultConfig: {
    mutedWords: []
  },

  patches: [
    {
      find: "receiveMessage",
      replacement: {
        receiveMessage(e) {
          if (e.type !== "MESSAGE_CREATE" || !e.message?.content) {
            return MessageModule.receiveMessage(e);
          }

          const lowerContent = e.message.content.toLowerCase();
          const shouldHide = this.settingsStore.mutedWords.some(
            word => lowerContent.includes(word.toLowerCase().trim())
          );

          if (shouldHide) {
            // Optional: show toast when hiding
            // Toasts.show({ message: "Hidden annoying message", type: Toasts.Type.INFO });
            return;
          }

          return MessageModule.receiveMessage(e);
        }
      }
    }
  ],

  settingsAbout: "Add words/phrases (one per line) to hide messages containing them.\nCase-insensitive matching.",

  settingsMain: {
    mutedWords: {
      type: "textarea",
      placeholder: "One word/phrase per line...\ne.g., badword\nannoying phrase\nspammer123",
      onChange: value => {
        const words = value
          .split("\n")
          .map(s => s.trim())
          .filter(s => s.length > 0);
        SettingsStore.setSetting(this, "mutedWords", words);
      }
    }
  },

  start() {
    this.settingsStore = SettingsStore.get(this, "mutedWords") ?? this.defaultConfig.mutedWords;

    // Fallback dispatcher patch for extra reliability
    this.unpatchDispatcher = Patcher.instead(Dispatcher, "dispatch", (_, args) => {
      const [event] = args;
      if (event.type !== "MESSAGE_CREATE" || !event.message?.content) {
        return Dispatcher.dispatch(...args);
      }

      const lower = event.message.content.toLowerCase();
      const shouldHide = this.settingsStore.some(
        word => lower.includes(word.toLowerCase().trim())
      );

      if (shouldHide) {
        return;
      }

      return Dispatcher.dispatch(...args);
    });
  },

  stop() {
    Patcher.unpatchAll();
  }
});
