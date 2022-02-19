console.clear();

gsap.registerPlugin(ScrollTrigger);

const additionalY = { val: 0 };
let additionalYAnim;
let offset = 0;
const cols = gsap.utils.toArray(".col");

cols.forEach((col, i) => {
  const images = col.childNodes;

  // DUPLICATE IMAGES FOR LOOP
  images.forEach((image) => {
    var clone = image.cloneNode(true);
    col.appendChild(clone);
  });

  // SET ANIMATION
  images.forEach((item) => {
    let columnHeight = item.parentElement.clientHeight;
    let direction = i % 2 !== 0 ? "+=" : "-="; // Change direction for odd columns

    gsap.to(item, {
      y: direction + Number(columnHeight / 2),
      duration: 200,
      repeat: -1,
      ease: "none",
      modifiers: {
        y: gsap.utils.unitize((y) => {
          if (direction == "+=") {
            offset += additionalY.val;
            y = (parseFloat(y) - offset) % (columnHeight * 0.5);
          } else {
            offset += additionalY.val;
            y = (parseFloat(y) + offset) % -Number(columnHeight * 0.5);
          }

          return y;
        }),
      },
    });
  });
});

const imagesScrollerTrigger = ScrollTrigger.create({
  trigger: "section",
  start: "top 50%",
  end: "bottom 50%",
  onUpdate: function (self) {
    const velocity = self.getVelocity();
    if (velocity > 0) {
      if (additionalYAnim) additionalYAnim.kill();
      additionalY.val = -velocity / 2000;
      additionalYAnim = gsap.to(additionalY, { val: 0 });
    }
    if (velocity < 0) {
      if (additionalYAnim) additionalYAnim.kill();
      additionalY.val = -velocity / 3000;
      additionalYAnim = gsap.to(additionalY, { val: 0 });
    }
  },
});


// media 

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "vice city",
          artist: "XXXTENTACION",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806675935199253/004.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943826158200430602/1.mp3",
          url: "https://www.youtube.com/watch?v=h3r9myZYADc",
          favorited: true,
        },
        {
          name: "INDUSTRY_BABY",
          artist: "Lil_Nas_X_Jack_Harlow",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806406044315719/003-fix.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943830564526510130/y2meta.com_-_Lil_Nas_X_Jack_Harlow_-_INDUSTRY_BABY_EXTENDED_-_Official_Audio_256_kbps.mp3",
          url: "https://www.youtube.com",
          favorited: true,
        },
        {
          name: "Ninety",
          artist: "Jaden",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806301866180618/003-fix.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943830565315018782/y2meta.com_-_Jaden_-_Ninety_128_kbps.mp3",
          url: "https://www.youtube.com",
          favorited: false,
        },
        {
          name: "BYE",
          artist: "Jaden",
          cover:
            "https://media.discordapp.net/attachments/943806118700912660/943806281167273984/004-fix.png?width=460&height=671",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943830631316615258/y2meta.com_-_Jaden_-_BYE_Official_Visualizer_192_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
        {
          name: "NEW_GIRL",
          artist: "FINNEAS",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806240608358410/004-fix.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943830632054800454/y2meta.com_-_FINNEAS_-_NEW_GIRL_Official_Music_Video_320_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: true,
        },
        {
          name: "Lost_My_Mind",
          artist: "FINNEAS",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806255783366696/004-fix.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943830651847704576/y2meta.com_-_FINNEAS_-_Lost_My_Mind_Audio_320_kbps.mp3",
          url: "https://www.youtube.com",
          favorited: false,
        },
        {
          name: "Yamborghini_High",
          artist: "ASAP",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806340290187264/003-fix.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943831020766117902/y2meta.com_-_AAP_Mob_-_Yamborghini_High_Official_Video_-_Explicit_ft._Juicy_J_192_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: true,
        },
        {
          name: "_Babushka_Boi",
          artist: "AAP_Rocky_-",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806471278325830/003-fix.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943831021378478120/y2meta.com_-_AAP_Rocky_-_Babushka_Boi_Official_Video_320_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
        {
          name: "Praise_The_Lord_Da_Shine",
          artist: "AAP_Rocky",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806489515139092/003-fix.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943831022221557760/y2meta.com_-_AAP_Rocky_-_Praise_The_Lord_Da_Shine_Official_Video_ft._Skepta_256_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
        {
          name: "POTATO_SALAD",
          artist: "AAP_ROCKY_X_TYLER_THE_CREATOR",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806719966990356/004.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943831022880055346/y2meta.com_-_AAP_ROCKY_X_TYLER_THE_CREATOR_-_POTATO_SALAD_320_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
        {
          name: "Break_My_Heart_Again",
          artist: "FINNEAS",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806657211817984/004.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943831023437901864/y2meta.com_-_FINNEAS_-_Break_My_Heart_Again_Official_Video_256_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
        {
          name: "Lets_Fall_in_Love_for_the_Night",
          artist: "FINNEAS",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806639180492820/004.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943831024163508244/y2meta.com_-_FINNEAS_-_Lets_Fall_in_Love_for_the_Night_Official_Video_320_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
        {
          name: "_Arya",
          artist: "Nigo_ft._AAP_Rocky",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806567277551676/004.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943831655175581736/y2meta.com_-_Nigo_Arya_ft._AAP_Rocky_Official_Music_Video_320_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
        {
          name: "JUGGERNAUT",
          artist: "Tyler_The_Creator",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806581684981790/004.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943831838147899392/y2meta.com_-_Tyler_The_Creator_-_JUGGERNAUT_Official_Video_320_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
        {
          name: "Again",
          artist: "Jaden",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/943806602983669810/004.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/943832098274422834/y2meta.com_-_Jaden_-_Again_192_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
        {
          name: "I.F.L.Y.",
          artist: "Bazzi",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/944461596648964096/81HC2HywjbL.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/944460756232060928/y2meta.com_-_Bazzi_-_I.F.L.Y._Official_Music_Video_320_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
        {
          name: "Plastic",
          artist: "Jaden",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/944461656568758272/71fJJQq2E4L.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/944460756802474016/y2meta.com_-_Jaden_-_Plastic_320_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
        {
          name: "Homemade_Dynamite",
          artist: "Lorde_Feat._Khalid_Post_Malone",
          cover:
            "https://cdn.discordapp.com/attachments/943806118700912660/944461711535116308/game4v-chainsaw-man-17.png",
          source:
            "https://cdn.discordapp.com/attachments/943824945169956915/944460757318398002/y2meta.com_-_Lorde_-_Homemade_Dynamite_Feat._Khalid_Post_Malone__SZA_REMIX_256_kbps.mp3",
          url: "https://www.youtube.com/",
          favorited: false,
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null,
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited =
        !this.tracks[this.currentTrackIndex].favorited;
    },
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function () {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement("link");
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image";
      document.head.appendChild(link);
    }
  },
});
