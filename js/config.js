/* ============================================================================
   config.js — everything you might want to edit lives in this one file.
   Asset paths, the sticker list, and every message on the site.
   ========================================================================= */

window.CONFIG = (function () {

  /* --- assets ---------------------------------------------------------- */
  const ASSETS = {
    audio: 'assets/audio/song.mp3',     // background song, loops
    video: 'assets/video/opening.mp4'   // the surprise video
  };

  /* --- Dudu & Bubu stickers -------------------------------------------- */
  /* Swap any URL for a local file like 'assets/stickers/1.png' if you want. */
  const STICKERS = [
    'https://cdn2.cdnstep.com/l3XP16i4jNpGBntzrSqF/2-4.thumb128.png',
    'https://cdn2.cdnstep.com/l3XP16i4jNpGBntzrSqF/8-4.thumb128.png',
    'https://cdn2.cdnstep.com/dpZgBZM9wQnOA4eB0zP8/40-1.thumb128.png',
    'https://cdn2.cdnstep.com/cGaENMCsPmRNvsN6b9F2/4-1.thumb128.png',
    'https://cdn2.cdnstep.com/cGaENMCsPmRNvsN6b9F2/10-1.thumb128.png',
    'https://cdn2.cdnstep.com/cGaENMCsPmRNvsN6b9F2/7-1.thumb128.png'
  ];

  /* --- opening screen --------------------------------------------------- */
  const OPENING = {
    line1: 'Hey Gubbi...',
    line2: 'I made a little something for you.',
    button: 'Open your surprise'
  };

  /* --- birthday screen -------------------------------------------------- */
  const BIRTHDAY = {
    title: 'Happy Birthday,',
    name: 'Devva',
    kannada: 'ಹುಟ್ಟುಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು ದೇವ್ವಾ ❤️'
  };

  /* Short lines that fade in and out under the birthday title. */
  const ROTATING = [
    'ನನ್ನ ಗೊಬ್ಬಿ, ಯಾವಾಗಲೂ ಹೀಗೆ ನಗ್ತಾ ಇರು.',
    'ನನ್ನ happiness ಗೆ ಒಂದು ದೊಡ್ಡ reason ನೀನೇ.',
    'ಇವತ್ತು ಫುಲ್ ನಿನ್ನ ದಿನ, ದೇವ್ವಾ. ಎಂಜಾಯ್ ಮಾಡು.',
    'ನೀನು ಹೀಗೆ cute ಆಗಿ ಇರೋದು ಮುಂದುವರಿಸು.',
    'Today you get everything your way, Dummu.'
  ];

  /* Tapping a little Dudu & Bubu opens one of these. */
  const NOTES = [
    'ದುಮ್ಮು, ಇವತ್ತು ಮಾತ್ರ ನಿನ್ನನ್ನ ಇಷ್ಟೊಂದು irritate ಮಾಡಲ್ಲ 😌',
    'ಇವತ್ತು ನಿನ್ನ birthday, so one day exception… ನನ್ನ irritation ನಿಂದ 😄',
    'ನಿನ್ನ ನಗು ನೋಡಿದ್ರೆ ನನ್ನ ದಿನಾನೇ ಸರಿ ಹೋಗುತ್ತೆ.',
    'ಊಟ ಸರಿಯಾಗಿ ಮಾಡು ಗೊಬ್ಬಿ. ಇವತ್ತಾದ್ರೂ ಕೇಳು.',
    'ನನ್ನ ಗೊಬ್ಬಿಗೆ ತುಂಬಾ ತುಂಬಾ ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು.',
    'You are my favourite person. Even when you argue with me.',
    'ದೇವ್ವಾ, ನೀನು ಖುಷಿಯಾಗಿದ್ರೆ ಸಾಕು. ಅಷ್ಟೇ ಬೇಕು ನಂಗೆ.',
    'Happy Birthday ನನ್ನ ದೇವ್ವಾ.'
  ];

  /* --- "one more thing" screen ------------------------------------------ */
  const MORE = {
    kicker: 'Wait...',
    title: "there's one more thing",
    line: 'ಒಂದು ಸಣ್ಣ surprise ಇದೆ. Look closer.',
    button: 'Look closer'
  };



 /* --- last screen ------------------------------------------------------ */
  const FINAL = {
    title: 'Happy Birthday, Dummu',
    line: 'That was one little surprise from some very special little people. Stay happy, keep smiling, and keep irritating me a little less.',
    kannada: 'ಪ್ರತಿ ವರ್ಷಾನೂ ಹೀಗೇ ನಗ್ತಾ ಇರು ಗೊಬ್ಬಿ.',
    button: 'Start again'
  };

  return { ASSETS, STICKERS, OPENING, BIRTHDAY, ROTATING, NOTES, MORE, FINAL };
})();