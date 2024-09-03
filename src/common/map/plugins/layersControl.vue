<template>
  <div class="list" v-if="vis">
    <h1>图层控制</h1>
    <el-scrollbar style="height: calc(100% - 30px);">
      <ul @dragstart="onDragStart"
          @dragover="onDragOver"
          @dragend="onDragEnd"
          ref="taskListUl">
        <li v-for="(item,index) in newsList"  draggable="true"
            :id="item.key" :key="item.key"  >
          <!--<span class="name2">{{item.index}}</span>-->
          <span class="name">{{item.name}}</span>
          <div class="operate">
          <span @click="visFunc(index)">
                <img v-if="item.vis" style="height: 22px;"
                     src="data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEJ0lEQVRoQ+2YXWgcVRTH/2emKUjqx862WMHGoDtbtKK+SIugWB+sgooWjNWHKMViM7utWlGhPhjBDwTrR5OZtSJURaHFB2v6UqPYhyLYB0WwFrKzgUhFbOvebTQiNtl7ZNZs3W42O/fuTJTADCwsM+f8z/2dcz/ODGGRX7TIx48E4P+uYFKBpAIRM5BMoYgJjOyeVKCeQutt/xpUZR8M8wpm7iVQL8C9ACZrP8IkmCeJjUNSTo9Utl39feT0A9EOsmW7/RVLu6gfjI0A36Q1IKKvIKtfTHP30O/5y8tavg3GHU+hlFt8jIieAmB3GjzwI8I4M4bFqZ+GMbh+RldLGyDtjt/IJF8EcLtusHb2zPiWQM+JXOaQjq4WgFXw+8DYrxNA15aJtlYGMntU/ZQBUp7/KQH3qApHsiMMigH7BRUNJYC0548wcLeKYHw2xmbhXLU3TC8UwCr474CxJUzo3+c0wSwLMMzjpmF+YxhSzpytXg/QdSD5LEDL1bXQJxz743b2bQHSnr+TgZeUAxK919W9LH+yf+UfrXwueveEteTsnwcAullZE+0h5gVIeeMPEeRH6oH4iHCyt6jYW4XSXjA/omI7azNvJVoCrHBLmSrxlwBWqQXhX2eWXrD6t0dXCRX7Sz/4pXt6aurY7Emt4nJGMq8/k8t+12zcEsDy/H0AHlBRrtkwPS1ymdca7dPDxbVs0FvBPZL8eDmfPdr4POUWnyGiV1VjMOhAxcncFwqQ9krbGLxbVfgfAGwQOXu07lPriyR+OE/DwBqx1T5ev5cqjN9FLA9qxQGeFI79ZqPPnApYnn8MwBod4SVd5spTW648eQ7A84PTdEOTxmfCse+o31u+Z+IyWZ3+WScOA6WKY5/XuiwUwNcA1jYN7qhw7HX/BcATAN7QyUzzFJqd/wHEuYskr2tcB51MIQJtLzuZobZTKHiY8kqfEPheZYgWi3h2Hbxe0zCwo3H+12JoLmIA+4VjbwpdxIHBJW7xBoPocPBXDWLBt9ETJtNtp3OZkhJAYJR2x/qZjPfVAGpb0cIdZCw3idzqll1w21bC8vwdAHYpQyxIK8GbhZOdt6kLb+bcsUGQ8bwyBOJr5gjIlx3bbRc7FCBwtrQh1HHns2TArTh2PkxJCaC2Jjw/x8BwmGBMz0eFYzcfhC2llQFqu9OQf6th8ghAF8Y00DkyDLxSceydqvpaAA1b7MsA7lQNomg3GjR35YFM0AUrX9oAdeWUW3yQiII5qvc9aO7QfGbeVclllV/kGyU6BqiLpL2xhyWMjdov/ITPiengXzO8b2q7fVo55U2GkQHqesFXui4T9xuEaxnUA+IeMHoAXIxgawVPENEEZPVHE+aHrU7VTiBiA+gkeBw+CUAcWYyikVQgSvbi8E0qEEcWo2gkFYiSvTh8F30F/gYNg4dAQ8H6KQAAAABJRU5ErkJggg==" />
                <img v-else-if="!item.vis" style="height: 22px;"
                     src="data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAETElEQVRoQ+2YTYwTZRjH/8/b3XgibKeiBhExu9MCh40JRk9rNB5MjImSCCJ+IFGBnYIJ7EXjQUw0e0EPup1B8XNFssrFxHggBGPixSAHwChspxiNKwel0/pxwd19HzPdNtbudN5nrI1L0vfSwzwfv//zvJ8lXOGDrnB+9AT83x3sdaDXgQ4r0JtCHRawY/cl1wHL9TcFjn1UqmxJCbBc/yMAmwBslor4zwRYhdINYL2WSOWYsBqEFdD6GiaaA2MGCj+GvzyPmeoe+/PWCjfBNz6JRHQsIO0WtxLoMQB3S9sO8EUAR/Tl/peqe2+qRsAfDRx7syTevxaQ9kpbSPMYCLdIEsXYnAZwc9N3MXzok1hA2j0/TFDPArSlQ/Ao90TwiQVYhekHQeoVACuXAnwiAVZhej9IPW8EDxcs4ThDndRz+ri6Sl3Cn1hNSt8K4m0AjUTESFz5RgzRFBLDE/bNzs9N/r57XbmdUMsrfQXm5nWzCD7MR0TlspN9zVQwowApfODYxljpgv8ZEe6MW7DN+Qi0sewMfRwnIjZpeCoCCA8Xw+CpwMk+1DDKeNPXA6mnNSML8B+K+YQG3U+E+6Twdbvfwu05cOwv2wG0FWAd8ldhlk4AnI2lJwQacxuqo+u+D+2EHYucNm3W2Bl9ue+O8LyI4mgvwPXfBPCEqfYAvxE42Z01+IP+emh8Y/BJAr8QiuhQMDq0QywgffDCPaT1p2Z4gIFHK459OLTNFPxxJjwT45ccvh6MoDeWndyi9RDZAcv1f5Lu9VrPrqnuXv9DrQN/X8aiNERulZbrs6RQAC4Fjr2i1badgHDxLJME5pQaqOwc/DW0Tbv++wQ8EuEXCb/8VX8w1YeSJA+AcuDYV4sEpN3SDgK/LgnM82q4smfw64UpVHycid5p8Wt7SKXdC7sI2pPkIebt5Xz2XZGAejVPEbDBGJzxZJC336r7vEdAeDNtjNgT1nL9twFsN+VgxmQlb28TL+IazETxXlL0iSk4wF8ETvb2jOt/wMBWKfyyiXOZfuo7DcKq+BxURD/fFTxlzyQSUJsSrp9nYMIsAsda3gPGu43l+XvBCC+GphH7sDEe/8KDqRnCCB8ai3Yf1i8E+dz+OIVGAbVk0psoEAs/4J1bozg1LnpLCOBDNpGABRGlMRAfiKlGJPzAxLc3kuofIfAIiB4AwzLNGQjhEwmot73d5W4RfNorvkhMzxlh/2lwEaz3Bfnch1I/cQcaASUPcMsrHQDzmBRiwY6nGHq84qw9m8QvkQAJfMYteQzeJYZgnGJFL1dGh6bEPk2GYgEieM8/zIyHhSDHGDxZcbJHhPaRZiIBEQ+b6AUb7jJa3cakhgm4FuDrwCAo9TMYvzDoO57X51N92i+P5sILY8dDJKBlAYv2+Y7JhAHEAhoipP9ZCvN3bJZIQMfZuhCgJ6ALRU0UsteBROXqgnGvA10oaqKQvQ4kKlcXjP8CRdK7QMiPE/0AAAAASUVORK5CYII=" />
          </span>
            <!--<span @click="sortUp(index)"> 上移↑  </span>-->
            <!--<span @click="sortDown(index)">  下移↓ </span>-->
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script>
  export default {
    name: 'layersControl',
    props: ['gisMap'],
    data () {
      return {
        vis: false,
        msg: 'list',
        draging: null,
        target: null,
        newsList: [
        ]
      }
    },
    methods: {
      onDragStart(event){     // 用于在拖拽开始时获取被拖拽元素
        // // console.log("drag start")
        this.draging = event.target
        // // console.log(this.draging)
      },
      onDragOver(event){    // 用于在拖拽过程中，获取拖拽元素经过的对象，以及对元素顺序做出调整
        // // console.log('drag move')
        this.target = event.path[0]    //li的位置
        // // console.log(event)
        // // console.log(this.target)
        let targetTop = event.target.getBoundingClientRect().top
        let dragingTop = this.draging.getBoundingClientRect().top
        if (this.target.nodeName === "LI" && this.target !== this.draging) {
          if (this.target) {
            if (this.target.animated) {
              return
            }
          }
          if (this._index(this.draging) === this._index(this.target)){
            this.target.parentNode.insertBefore(this.draging,this.target.nextSibling)
          }else{
            this.target.parentNode.insertBefore(this.draging, this.target)
          }
          this._anim(targetTop,this.target)
          this._anim(dragingTop,this.draging)
        }
      },
      _anim(startPos,dom) {    //用于重绘元素
        let offset = startPos - dom.getBoundingClientRect().top
        dom.style.transition = 'none'
        dom.style.transform = `translateY(${offset}px)`
        //触发重绘
        dom.offsetWidth;
        dom.style.transition = 'transform .3s'
        dom.style.transform=``
        clearTimeout(dom.animated)
        dom.animated=setTimeout(()=> {
          dom.style.transition = ''
          dom.style.transform = ``
          dom.animated=false
        }, 300)
      },
      onDragEnd(event){   //结束后跟俊最终拖拽调整subTaskList数组
        // // console.log('drag end')
        //获取排序后的li节点数组
        let currentNodes = Array.from(this.$refs.taskListUl.childNodes)
        let newArr = []
        let index = 40
        for(let i=0;i<currentNodes.length;i++) {
          for(let j=0;j<this.newsList.length;j++) {
            if(currentNodes[i].id == this.newsList[j].key){
              newArr[i] = this.newsList[j]
              this.gisMap.setLayerZIndex( this.newsList[j].key, index);
              newArr[i].index = index
              index--
            }
          }
        }
        this.newsList = newArr
        // // console.log(this.newsList)
      },

      _index(el){    //用于根据元素id来获取对应元素的索引值
        let domData=Array.from(this.$refs.taskListUl.childNodes);
        return domData.findIndex((currentValue,index,arr)=>{
          return el.key == currentValue.key
        });
      },
      show () {
        this.vis = true
        this.newsList = this.gisMap.layersList
      },
      hide () {
        this.vis = false
      },
      swapArr (arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      },
      visFunc (index) {
        let key = this.newsList[index].key
        this.newsList[index].vis = !this.newsList[index].vis
        this.gisMap.setLayerVis(key,this.newsList[index].vis);

      },
      sortUp (index) {
        if (index === 0) {
          alert('不能在上移了！')
          return
        }
        // 先修改layer index
        let aIndex = this.newsList[index].index
        let bIndex = this.newsList[index-1].index
        this.gisMap.setLayerZIndex(this.newsList[index].key, bIndex);
        this.gisMap.setLayerZIndex(this.newsList[index-1].key, aIndex);
        this.newsList[index].index = bIndex
        this.newsList[index-1].index = aIndex
        this.newsList = this.swapArr(this.newsList, index, index-1)
      },
      sortDown (index) {
        if (index === this.newsList.length-1) {
          alert('不能在下移了！')
          return
        }
        let aIndex = this.newsList[index].index
        let bIndex = this.newsList[index+1].index
        this.gisMap.setLayerZIndex(this.newsList[index].key, bIndex);
        this.gisMap.setLayerZIndex(this.newsList[index+1].key, aIndex);
        this.newsList[index].index = bIndex
        this.newsList[index+1].index = aIndex

        this.newsList = this.swapArr(this.newsList, index, index+1)
      }
    }
  }
</script>
<style scoped>
  .list{
    /*width: 286px;*/
    /*height: 200px;*/
    /*position: absolute;*/
    /*top:45px;*/
    /*left:-5.1rem;*/
    /*bottom:auto;*/
    /*right: auto;*/
    width: 100%;
    height: 100%;
    /*padding: 10px 5px;*/
    /*background-color: #fff;*/
    /*border: 1px solid #eee;*/
    /*box-shadow: 1px 1px 2px 0px #908989;*/
  }
  h1,
  h2 {
    font-weight: normal;
  }

  .name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
    height: 22px;
    display: inline-block;
  }
  ul {
    list-style-type: none;
    padding: 0;
    text-align: left;
    height: auto;
  }

  li {
    width: 87%;
    border: 1px solid #ccc;
    margin: 5px;
    line-height: 25px;
    height: 25px;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 1px 1px 3px 0px #d4d4d4;
  }

  .active {
    background-color: #078EFF;
  }

  a {
    color: #42b983;
  }

  .operate {
    float: right;
  }

  .operate span:first-of-type {
    color: #f00;
  }

  .operate span {
    cursor: pointer;
    color: #42b983;
  }
</style>
