<template>
  <div id="list-page-header">
    <CoverImage
      :id="0"
      :image-url="itemInfo.coverImgUrl | resizeImage(1024)"
      :show-play-button="true"
      :always-show-shadow="true"
      :click-cover-to-play="true"
      :fixed-size="300"
      type="playListPage"
      :cover-hover="false"
      :play-button-size="18"
    ></CoverImage>
    <!-- <div class="image">
        <img :src="`${itemInfo.coverImgUrl}`" alt="" />
      </div> -->

    <div class="info">
      <div class="play-list-name">{{ title }}</div>
      <div class="other" v-if="type === 'playList'">
        <div class="create-info">
          <img :src="`${creatorInfo.avatarUrl}?param=224y224`" alt="" />
          <div class="creator">{{ creatorInfo.nickname }}</div>
          <div class="create-time">
            {{ itemInfo.createTime | formatTime("Human") }} 创建
          </div>
        </div>
        <div class="count-info">
          <span class="count">
            歌曲:
            <span class="number">
              {{ itemInfo.trackCount }}
            </span>
          </span>
          <span class="count">
            播放:
            <span class="number">
              {{ itemInfo.playCount }}
            </span>
          </span>
        </div>
        <div class="description">
          {{ itemInfo.description }}
        </div>
      </div>
      <div class="other" v-if="type === 'album'">
        <div class="create-info">
          <div class="creator">歌手：</div>
          <div class="create-time">
            {{ artistsInfo | artists }}
          </div>
        </div>
        <div class="create-info">
          <div class="creator">时间：</div>
          <div class="create-time">
            {{ itemInfo.publishTime | formatTime("Human") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoverImage from "./CoverImage.vue";
export default {
  props: {
    itemInfo: { type: Object },
    title: { type: String, required: true },
    type: { type: String, requierd: true },
    creatorInfo: { type: Object }, //歌单
    artistsInfo: { type: Array }, //歌单
  },
  components: { CoverImage },
};
</script>

<style lang="less" scoped>
#list-page-header {
  display: flex;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 20px;
    .play-list-name {
      font-size: 40px;
      font-weight: bold;
    }
    .other {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 60%;
      .create-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & * {
          margin: 5px 5px;
        }
        .create-time {
          opacity: 0.6;
        }
        img {
          width: 40px;
          border-radius: 50%;
        }
      }
      .count-info {
        .count {
          margin: 5px 5px;
          .number {
            opacity: 0.6;
          }
        }
      }
      .description {
        opacity: 0.6;
        height: 100px;
        line-height: 25px;
        overflow: scroll;
        text-overflow: ellipsis;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
}
</style>