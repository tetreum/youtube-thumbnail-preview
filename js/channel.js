class Channel {
    constructor () {
        this.section = this.getSectionToShow();

        this.$videosContainer = document.getElementById(this.section == 'home' ? 'home-videos-container' : 'videos-container');
        
        switch (this.section) {
            case "home":
                this.showHome();
                break;
            case "channel":
                this.showChannel();
                break;
        }
    }

    showHome () {
        document.getElementById('home-page').classList.remove("d-none");

        [{
            title: "The Good Life Radio",
            thumbnail: "https://i.ytimg.com/vi/36YnV9STBqc/hq720_live.jpg?sqp=CKDr95QG-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD-YtYe8SUFDkn6eLv3rVYYej50Bw",
        },
        {
            title: "Why Venice is Europe’s Worst Placed City",
            thumbnail: "https://i.ytimg.com/vi/RuhHrEm7xGY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBWCh9BC27bVgqP4k-uLVKanDHjKA",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLSYHk2qdHNPpyk-X-tIdiEPwGqfpJOn74g4g8_1Bw=s68-c-k-c0x00ffffff-no-rj"
        },
        {
            title: "The Good Life Radio",
            thumbnail: "https://i.ytimg.com/vi/36YnV9STBqc/hq720_live.jpg?sqp=CKDr95QG-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD-YtYe8SUFDkn6eLv3rVYYej50Bw",
        },
        {
            title: "Dua Lipa, Avicii, Coldplay, Martin Garrix & Kygo, The Chainsmokers Style - Feeling Me",
            thumbnail: "https://i.ytimg.com/vi/f7_y-lvOOjQ/hq720_live.jpg?sqp=CKDr95QG-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCOwF1peV-qVs9oXTI9eY4C6MDjRw",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLSPKRE-sqc1-ZGMl1COlgMmykAQtqSZVvLmdfeVkQ=s68-c-k-c0x00ffffff-no-rj"
        },
        {
            title: "THE F-35 | Where the World's Most Advanced Fighter Jet is Built",
            thumbnail: "https://i.ytimg.com/vi/aPEy3QwsKjQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBnusXtfkVfEGDIUiZox6PSc0ZsiQ",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQYcLqrGZC1RZL4e1AFz5-ImMQmmgObvzWBCL7-mA=s68-c-k-c0x00ffffff-no-rj"
        },
        {
            title: "This Is Why We Don’t Toss Out Broken Microwaves | Remake Projects",
            thumbnail: "https://i.ytimg.com/vi/S2UfglFeOH8/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDF7c_Ohnv_w5dXoDdpkc8gkKsDGg",
        },
        {
            title: "Spain's solar energy crisis: 62,000 people bankrupt after investing in solar panels • FRANCE 24",
            thumbnail: "https://i.ytimg.com/vi/-0gbisTsj2w/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAxhgKepulyFDMRXqnUEzSXJ_Gf9g",
        },
        {
            title: "Sniper Climbs High-rise ROOFTOP and Destroys EVERYONE",
            thumbnail: "https://i.ytimg.com/vi/UCkHB75WlIQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLEYWV7fMnVRc7mAC1v2Tb0Z4LWw",
        }].forEach((video, i, list) => {

            const tpl = this.getVideoTemplate();

            tpl.querySelector('h3 a').innerText = video.title;
            tpl.querySelector('.thumbnail img').src = video.thumbnail;
            tpl.querySelector('.duration').innerText = this.random(3, 20) + ":" + this.random(10, 59);
            tpl.querySelector('.views').innerText = this.random(3, 20) + "M views";
            tpl.querySelector('.date').innerText = this.random(2, 7) + " days ago";

            if (typeof video.avatar !== "undefined") {
                tpl.querySelector('.avatar').src = video.avatar;
            }

            this.$videosContainer.appendChild(tpl);

            if (i == (list.length - 1)) {
                this.loadSavedThumbnail();
            }
        });
    }

    random(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    showChannel () {
        document.getElementById('channel-page').classList.remove("d-none");
        document.querySelector('[data-bs-target="#customize-modal"]').classList.remove("d-none");

        this.loadSavedChannel();
        this.setupListeners();
    }

    setupListeners() {
        const $customizeModal = document.getElementById('customize-modal');

        $customizeModal.querySelector('.modal-footer button').addEventListener("click", () => {
            let json = $customizeModal.querySelector('textarea').value.trim();

            if (json.length < 1) {
                return;
            }

            json = JSON.parse(json);

            if (!json) {
                return;
            }

            this.apply(json);
            bootstrap.Modal.getInstance($customizeModal).hide();
        });
    }

    getSectionToShow () {
        let section = new URLSearchParams(location.search).get("section");
        return ["home", "channel"].includes(section) ? section : 'channel';
    }

    loadSavedChannel () {
        let channel = localStorage.getItem("channel");
        channel = JSON.parse(channel);

        if (channel === null) {
            // default channel info
            localStorage.setItem("channel", '{"name":"Wizards Code","subscribers":"2.31K subscribers","avatar":"https://yt3.ggpht.com/yqajHMYse5p5VJE7GgwTXbbvgIDoEM37uIq9Jabc4T2W_GAUo0g7NtUs4ac1Yx55Lp_V-1j79g=s88-c-k-c0x00ffffff-no-rj","videos":[{"title":"Blaze Neo Prototype 29 May 2022","thumbnail":"https://i.ytimg.com/vi/TgOtc4wQF9U/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCbm57uOf2l6tObgCJ-YCQEp3dAbg","duration":"0:48","views":"139 views","date":"7 days ago"},{"title":"Create Procedural Terrain - Part 3 - Underwater with Map Magic and Thalassophobia Stylized Ocean","thumbnail":"https://i.ytimg.com/vi/GeQpbykfV1c/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCXH-GH3YypFFfMk4TZXdPecEczZg","duration":"13:18","views":"166 views","date":"3 weeks ago"},{"title":"Create Procedural Terrain - Part 2 - Underwater with Map Magic and Thalassophobia Stylized Ocean","thumbnail":"https://i.ytimg.com/vi/13bJh_RapPU/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAD7FOayJcXePwgLLjokBuutgKRSg","duration":"11:48","views":"247 views","date":"1 month ago"},{"title":"Procedural Scene Test: Dragon over Rolling Hills","thumbnail":"https://i.ytimg.com/vi/_caDN1DeyQg/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC89WBUeiM79TZDQihOY3Qyz0erQA","duration":"0:21","views":"213 views","date":"1 month ago"},{"title":"Trump Vs Mutant Guy","thumbnail":"https://i.ytimg.com/vi/3ieygHSHGH8/hq2.jpg","duration":"  SHORTS","views":"156 views","date":"1 month ago"},{"title":"Create Procedural Terrain - Part 1 - Underwater with Map Magic and Thalassophobia Stylized Ocean","thumbnail":"https://i.ytimg.com/vi/r_VmOWIoVDU/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDGiB_AG6EzRVeiF_qUJZYgQCSihQ","duration":"14:17","views":"331 views","date":"1 month ago"},{"title":"Angela Merkel takes down Putin","thumbnail":"https://i.ytimg.com/vi/hZjbWcx9pFk/hq2.jpg","duration":"  SHORTS","views":"55 views","date":"1 month ago"},{"title":"Elizabeth Warren vs Big Ork","thumbnail":"https://i.ytimg.com/vi/Obf6D1LhEu4/hq2.jpg","duration":"  SHORTS","views":"209 views","date":"1 month ago"},{"title":"Stylized Oceans Unity Asset - First Impressions Review","thumbnail":"https://i.ytimg.com/vi/BpQww5pZIfw/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLByPvtzk4jrDV66-FCL0EEZvLxg","duration":"9:40","views":"343 views","date":"2 months ago"},{"title":"Dragon Flight Test | What do you think? | AI","thumbnail":"https://i.ytimg.com/vi/k5bfatXxiQg/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLApku0DxtLPNe2XpLqFLaQKl_4vbg","duration":"1:46","views":"343 views","date":"4 months ago"},{"title":"Dragon Flight over a Procedural World","thumbnail":"https://i.ytimg.com/vi/I8OWk5mNUdA/hq2.jpg","duration":"  SHORTS","views":"208 views","date":"4 months ago"},{"title":"The Migration - Entirely Procedural Scene in Unity 3D","thumbnail":"https://i.ytimg.com/vi/RstsTzpdUqE/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBPr3-eHG8hW0GSrMhYP9ZX9sDDpA","duration":"1:00","views":"534 views","date":"4 months ago"},{"title":"Writing a Game Design Document | Natures Beauty Game Jam | DevLog","thumbnail":"https://i.ytimg.com/vi/hX8MNtvvWJg/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDykCvBy0CDk-BZFyzKA24n0FcKJQ","duration":"8:29","views":"588 views","date":"6 months ago"},{"title":"Spawning Wildlife and Birds with Crux and Improve the Wolves Emerald AI | Edited Live Stream","thumbnail":"https://i.ytimg.com/vi/kBfGL8hlB-o/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDN8rSUZUU_s2JYdMcg6qsUHTcjYw","duration":"1:18:21","views":"783 views","date":"6 months ago"},{"title":"Create Animals with Emerald AI - Unity | Edited Live Stream","thumbnail":"https://i.ytimg.com/vi/eoO2SzRi1D8/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA_EXXjKELvZe6L3d8PdQkYkNcdAg","duration":"1:28:10","views":"3.7K views","date":"6 months ago"},{"title":"Create a Gaia Biome with Illustrated Nature Part 2 : (Edited) Live Stream","thumbnail":"https://i.ytimg.com/vi/Le6UNJ3kJdk/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCw_Nb-XbtrpMb_mAqGTJ2rI-qFjw","duration":"1:24:26","views":"392 views","date":"7 months ago"},{"title":"Timelapse : Creating a Gaia Biome with Illustrated Nature (Part 2)","thumbnail":"https://i.ytimg.com/vi/E4IpsFpcgtA/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDgqIjc-8UMo4Y7qNbTOc37RKNpFQ","duration":"1:02","views":"581 views","date":"7 months ago"},{"title":"Timelapse : Creating a Gaia Biome with Illustrated Nature","thumbnail":"https://i.ytimg.com/vi/J6YpuLzKVEM/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCR8Hx3_voHNOnjyxSFdbjXUPUMIQ","duration":"0:59","views":"288 views","date":"7 months ago"},{"title":"Creating a Gaia Biome with Illustrated Nature","thumbnail":"https://i.ytimg.com/vi/pr8CqigTl-U/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBzEcGBtWTb2c3QdvfDVCJxxhmMtQ","duration":"1:41:40","views":"1K views","date":"Streamed 7 months ago"},{"title":"Adding a Spell System to MinDiab | Unity DevLog","thumbnail":"https://i.ytimg.com/vi/9SUDQCUINN8/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDLH4-l0_ac5wWbAPYmiIeFSj_wMA","duration":"4:39","views":"437 views","date":"8 months ago"},{"title":"Be a part of my GameDev journey and playtest my pre-pre-pre-alpha release of MinDiab v0 0 1","thumbnail":"https://i.ytimg.com/vi/plCttaV9WOU/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA3pqPx-c-fXGSLiOwhj90ZfJzabQ","duration":"0:51","views":"283 views","date":"8 months ago"},{"title":"Stream: Unity 3D: CiDy2 and 3D Forge","thumbnail":"https://i.ytimg.com/vi/oBgf12yjJI4/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBx6IdtH9k6Xq1USBqLq5xa0XgIeA","duration":"54:12","views":"329 views","date":"Streamed 1 year ago"},{"title":"Stream: Making a Gaia Biome using Nature Manufacture Assets : Unity 3D","thumbnail":"https://i.ytimg.com/vi/zXmsQFDhY6g/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSUgEkmXdHLJK7j-7HbghM0qxU9A","duration":"2:23:50","views":"4.1K views","date":"Streamed 10 months ago"},{"title":"Test Shot: Explosions in time with the Music","thumbnail":"https://i.ytimg.com/vi/ed0KF-V7cos/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAkC-V6tpsnaAugPfuCqYAomM2anw","duration":"4:54","views":"520 views","date":"10 months ago"},{"title":"Mini-Diablo Experimental Game | Spells, Random Dungeons and Enemies | Unity DevLog","thumbnail":"https://i.ytimg.com/vi/XSJm_YVZGBU/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDZxDHhMvPvsKUgT-ATucj0y-nidg","duration":"9:58","views":"646 views","date":"10 months ago"},{"title":"Add vehicles to your Unity FPS | NeoFPS and NWH Vehicle Physics","thumbnail":"https://i.ytimg.com/vi/jCoDcrpFRUE/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBNVchIYsuIxE2V1IE4GtdXgTab3Q","duration":"8:10","views":"2.8K views","date":"11 months ago"},{"title":"Speed Build: Unity Level / Terrain | Mega Mountains, Gaia, Enviro","thumbnail":"https://i.ytimg.com/vi/wizaDKGmCQo/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBuJ0ml2uFIZls_K03hU-CaYDDvuA","duration":"5:09","views":"678 views","date":"11 months ago"},{"title":"3 Hour FPS Prototype with Neo FPS","thumbnail":"https://i.ytimg.com/vi/MxUCuoqyvng/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBEF3nOPtPIHadLABx2DxDtPluMYQ","duration":"26:26","views":"2.3K views","date":"11 months ago"},{"title":"I built a (simple) Diablo Style Game in a weekend | DevLog","thumbnail":"https://i.ytimg.com/vi/tDvPCHqrllg/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBIg2CX7xtt-S5n_eNwlQjKejm2mg","duration":"9:33","views":"3.3K views","date":"1 year ago"},{"title":"Test Shot: Interdimensional Travel","thumbnail":"https://i.ytimg.com/vi/V5aSYCsvGbg/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDQJqg4o5tPKx03RhESlbMKCLqnzg","duration":"0:39","views":"346 views","date":"1 year ago"}],"banner":"https://yt3.ggpht.com/JLZaDnHtmLa1rcLJjYCNfQLkzJD4Ibq0WA12VvgAURyKqVDsYGWL0UFwvZsTEPgBNHDWa1tz=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"}');
            this.loadSavedChannel();
            return;
        }
        this.apply(channel);
    }

    loadSavedThumbnail () {
        const thumbnail = localStorage.getItem("thumbnail");
        const title = localStorage.getItem("title");

        if (thumbnail == null) {
            return;
        }

        const $videos = document.querySelectorAll('.video');
        const $video = $videos[$videos.length > 3 ? 2 : $videos.length - 1];

        $video.querySelector('img').src = thumbnail;
        $video.querySelector('h3 a').innerText = title;
    }

    apply (channel) {
        this.channel = channel;

        this.renderVideos().then(() => {
            this.loadSavedThumbnail();
        });

        document.getElementById('channel-avatar').src = this.channel.avatar;
        document.getElementById('channel-name').innerText = this.channel.name;
        document.getElementById('channel-subscribers').innerText = this.channel.subscribers;
        document.getElementById('channel-banner').style.backgroundImage = 'url("' + this.channel.banner + '")';

        localStorage.setItem("channel", JSON.stringify(channel));
    }

    renderVideos () {
        return new Promise ((resolve, reject) => {
            this.$videosContainer.innerHTML = "";

            this.channel.videos.forEach((video, i) => {

                if (video.duration.includes("SHORTS")) {
                    return;
                }

                const tpl = this.getVideoTemplate();

                tpl.querySelector('h3 a').innerText = video.title;
                tpl.querySelector('.thumbnail img').src = video.thumbnail;
                tpl.querySelector('.duration').innerText = video.duration;
                tpl.querySelector('.views').innerText = video.views;
                tpl.querySelector('.date').innerText = video.date;
                this.$videosContainer.appendChild(tpl);

                if (i == (this.channel.videos.length - 1)) {
                    resolve();
                }
            });
        });
    }

    getVideoTemplate () {
        return document.getElementById(this.section + '-video-tpl').content.cloneNode(true);
    }
}

window.channel = new Channel();