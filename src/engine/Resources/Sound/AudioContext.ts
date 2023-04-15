/**
 * Internal class used to build instances of AudioContext
 */

import { Future } from "../../Util/Future";

/* istanbul ignore next */
export class AudioContextFactory {
  private static _FUTURE = new Future<AudioContext>();
  private static _INSTANCE: AudioContext = null;

  public static create(): AudioContext {
    if (!this._INSTANCE) {
      if ((<any>window).AudioContext || (<any>window).webkitAudioContext) {
        this._INSTANCE = new AudioContext();
        this._FUTURE.resolve(this._INSTANCE);
      }
    }

    return this._INSTANCE;
  }

  public static getAudioContextAsync(): Promise<AudioContext> {
    return this._FUTURE.promise;
  }
}
