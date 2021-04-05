// PLAY AUDIO
export const play = async (playbackObject, uri) => {
  try {
    return await playbackObject.loadAsync({ uri }, { shouldPlay: true });
  } catch (error) {
    console.log("error in play function ", error);
  }
};
// PAUSE AUDIO

export const pause = async (playbackObject) => {
  try {
    return await playbackObject.setStatusAsync({
      shouldPlay: false,
    });
  } catch (error) {
    console.log("error in pause function ", error);
  }
};

// RESUME AUDIO

export const resume = async (playbackObject) => {
  try {
    return await playbackObject.playAsync();
  } catch (error) {
    console.log("erro ", error);
  }
};
// SELECT ANOTHER AUDIO
export const playNext = async (playbackObject, uri) => {
  try {
    await playbackObject.stopAsync();
    await playbackObject.unloadAsync();
    return await play(playbackObject, uri);
  } catch (error) {
    console.log("ERROR in play next function ", error);
  }
};
