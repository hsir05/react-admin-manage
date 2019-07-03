import Server from './server';


class API extends Server{
  /**
   *  用途：上传图片
   *  @url http://localhost:8888/api/upload
   *  返回status为1表示成功
   *  @method post
   *  @return {promise}
   */
  async uploadImg(params = {}){
    try{
      let result = await this.axios('post', 'http://localhost:8888/api/upload', params);
      if(result && result.status === 1){
        return result;
      }else{
        let err = {
          tip: '上传图片失败',
          response: result,
          data: params,
          url: 'http://localhost:8888/api/upload',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  async getUnitList(params = {}){
    try{
        let result = await this.axios('post', '/admin/unit/listPageUnit', params)
      if(result && result.code === 200){
        return result
      } 
    }catch(err){
      throw err
    }
  }

  async addArticle(params = {}){
    try{
      let result = await this.axios('post', '/article', params)
      if(result && result.status === '0'){
        return result
      }else{
        throw result
      }
    }catch(err){
      throw err
    }
  }

  async delteArticle(params = {}){
    console.log(params);
    try{
      let result = await this.axios('delete', '/article', params)
      if(result && result.status === '0'){
        return result
      }else{
        throw result
      }
    }catch(err){
      throw err
    }
  }

  async updateArticle(params = {}){
    console.log(params);
    try{
      let result = await this.axios('put', '/article', params)
      if(result && result.status === '0'){
        return result
      }else{
        throw result
      }
    }catch(err){
      throw err
    }
  }

  async login(params = {}){
    try{
      let result = await this.axios('post', '/admin/login', params)
      if(result && result.code === 200){
        return result
      }else{
        throw result
      }
    }catch(err){
      throw err
    }
  }
}

export default new API();
