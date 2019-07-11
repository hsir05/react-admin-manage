import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
const FormItem = Form.Item

class WropSearch extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.getSearch({name:values.search})
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
       <Form layout="inline" onSubmit={this.handleSubmit} className='search'>
         <FormItem  >
           {getFieldDecorator('search')(
             <Input size="default" prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }}  />} />
           )}
         </FormItem>
         <FormItem>
           <Button size='default' type="primary" htmlType="submit" > 搜索 </Button>
         </FormItem>
       </Form>
    )
  }
}
const Search = Form.create()(WropSearch)

export default Search;
