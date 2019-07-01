import React from 'react'
import { Form, Icon, Input, Button } from 'antd'

const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class WropSearch extends React.Component {
  componentDidMount() {
    this.props.form.validateFields()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //     this.props.getDate({title:values.search})
    //   }
    // });
  }

  render () {

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const searchError = isFieldTouched('search') && getFieldError('search');
    return (
       <Form layout="inline" onSubmit={this.handleSubmit} className='search'>
         <FormItem validateStatus={searchError ? 'error' : ''} help={searchError || ''} >
           {getFieldDecorator('search', {
             rules: [{ required: false, message: 'Please input your username!' }],
           })(
             <Input size="default" prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }}  />} placeholder="请输入文章标题" />
           )}
         </FormItem>

         <FormItem>
           <Button size='default' type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} > 搜索 </Button>
         </FormItem>
       </Form>
    )
  }
}
const Search = Form.create()(WropSearch)

export default Search;
