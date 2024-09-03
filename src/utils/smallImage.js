import http from "@/service/interface.js";

export default {
  smallImage(url = "", name) {
    // let ress = "";
    // new Promise((resolve,reject)=>{
    //   http.getMakeSmallImage({
    //     heightSize: 150,
    //     imagePath: url,
    //     type: 1,
    //     widthSize: 150
    //   })
    // })
    
    // if (res.data.status == 200) {
    // ress =
    //
    //   localStorage.setItem(name, ress);
    this.small(url)
  },

  small(url) {
    return http.getMakeSmallImage({
        heightSize: 150,
        imagePath: url,
        type: 1,
        widthSize: 150
      })
  }
};
