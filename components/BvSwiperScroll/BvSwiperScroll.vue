<!-- 滑动组件 -->
<template>
	<div class="bv-swiper-scroll-container">
		<div class="ba-row bv-swiper-scroll"
		     :class="[
		       direction== 'x' && 'direction-x',
		       direction== 'y' && 'direction-y'
		     ]"
		>
			<slot name="scroll-items" :scroll-to="scrollTo"></slot>
		</div>
	</div>
</template>

<script>

	import Velocity from 'velocity-animate';

  export default {
    name: "bv-swiper-scroll",
    props: {
      direction: {
        default: 'x',
        type: String
      },
      activeClassName: {
        type: String,
        default: 'default-class'
      },
      currentIndex: {
        type: Number,
        default: -1
      }
    },
    watch: {
      currentIndex() {
        this.scrollTo();
      }
    },
    methods: {
      scrollTo() {
				this.$nextTick(()=>{
          const direction = this.direction;
          const index = this.currentIndex;
          const wrapElm = this.$el;
          const scrollElm = wrapElm.children[0];
          const elm = scrollElm.children[index];

          if(!elm) return;

          let elmWidth, elmLeft, scrollElmWidth;
          let elmHeight, elmTop, scrollElmHeight;
          let distance, offset;

          if (direction == 'x') {
            elmWidth = elm.offsetWidth;
            elmLeft = elm.offsetLeft;
            scrollElmWidth = scrollElm.offsetWidth;
            distance = (elmLeft - ((scrollElmWidth - elmWidth) / 2));
            offset = distance - scrollElm.scrollLeft;
          } else if (direction == 'y') {
            elmHeight = elm.offsetHeight;
            elmTop = elm.offsetTop;
            scrollElmHeight = scrollElm.offsetHeight;
            distance = (elmTop - ((scrollElmHeight - elmHeight) / 2));
            offset = distance - scrollElm.scrollTop;
          }

          Velocity(scrollElm, "scroll", {
            axis: direction,
            duration: 180,
            MobileHA: true,
            container: scrollElm,
            offset
          });

          this.activeElm(elm);

          this.$emit('scrolled', {
            elm,
            offset: distance
          });
				});
      },
      activeElm(elm) {
        const _this = this;
        const parent = elm.parentNode;
        const children = parent.children;
        const activeClassName = _this.activeClassName.trim() || '';
        [].forEach.call(children, (_elm) => {
          if (_elm != elm) {
            _elm.classList.remove.apply(_elm.classList,activeClassName.split(' '));
          } else {
            _elm.classList.add.apply(_elm.classList,activeClassName.split(' '));
          }
        });
      },
      initScrollTo() {
        this.scrollTo(this.currentIndex);
      }
    },
    mounted() {
      this.initScrollTo();
    }
  }
</script>

<style scoped lang="scss">
	.bv-swiper-scroll-container {
		position: relative;
		overflow: hidden;
		.bv-swiper-scroll {
			white-space: nowrap;
			word-break: break-all;
			-webkit-overflow-scrolling: touch;
			&.direction-x {
				overflow-x: scroll;
				overflow-y: hidden;
			}
			&.direction-y {
				overflow-y: scroll;
				overflow-x: hidden;
				height: 100%;
			}
		}
	}
</style>