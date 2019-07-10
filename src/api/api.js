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
      if(result && result.code === 0){
        return result
      } 
    }catch(err){
      throw err
    }
  }

  async addUnit(params = {}){
    try{
        let result = await this.axios('post', '/admin/unit/addUnit', params)
        if (result && result.code === 0) {
        return result
      }else{
        throw result
      }
    }catch(err){
      throw err
    }
  }
  
    async getUsersList (params = {}) {
        try {
            let result = await this.axios('get', '/admin/list', params)
            if (result && result.code === 200) {
                return result
            }
        } catch (err) {
            throw err
        }
    }
    async addUser (params = {}) {
        try {
            let result = await this.axios('post', '/admin/regiter', params)
            if (result && result.code === 200) {
                return result
            } else {
                throw result
            }
        } catch (err) {
            throw err
        }
    }
    
   async getRolesList (params = {}) {
        try {
            let result = await this.axios('get', '/role/list', params)
            if (result && result.code === 200) {
                return result
            }
        } catch (err) {
            throw err
        }
    }
    async addRoles (params = {}) {
        try {
            let result = await this.axios('post', '/role/create', params)
            if (result && result.code === 0) {
                return result
            } else {
                throw result
            }
        } catch (err) {
            throw err
        }
    }
    async delRoles (params = {}) {
        try {
            let result = await this.axios('post', '/role/delete', params)
            if (result && result.code === 0) {
                return result
            } else {
                throw result
            }
        } catch (err) {
            throw err
        }
    }
    async getMenusList (params = {}) {
        try {
            let result = await this.axios('get', '/permission/list', params)
            if (result && result.code === 200) {
                return result
            }
        } catch (err) {
            throw err
        }
    }
    async addMenu (params = {}) {
        try {
            let result = await this.axios('post', '/permission/create', params)
            if (result && result.code === 200) {
                return result
            } else {
                throw result
            }
        } catch (err) {
            throw err
        }
    }
    async getMenusTree (params = {}) {
        try {
            let result = await this.axios('post', '/admin/rolePerm/treePerm', params)
            if (result && result.code === 0) {
                return result
            }
        } catch (err) {
            throw err
        }
    }
    async getTypesList (params = {}) {
        try {
            let result = await this.axios('post', '/admin/space/category/listPageAll', params)
            if (result && result.code === 0) {
                return result
            }
        } catch (err) {
            throw err
        }
    }
    async addType (params = {}) {
        try {
            let result = await this.axios('post', '/admin/space/category/add', params)
            if (result && result.code === 0) {
                return result
            } else {
                throw result
            }
        } catch (err) {
            throw err
        }
    }
    async delType (params = {}) {
        try {
            let result = await this.axios('post', '/admin/space/category/deleteById', params)
            if (result && result.code === 0) {
                return result
            } else {
                throw result
            }
        } catch (err) {
            throw err
        }
    }

    async captcha (params = {}) {
        try {
            let res = await this.axios('get', '/code/image', params)
            return 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        } catch (err) {
            throw err
        }
    }

  async login(params = {}){
    try{
        let result = await this.axios('post', '/authentication/form', params)
      if(result && result.code === 0){
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
