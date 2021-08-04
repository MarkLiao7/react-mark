import { Form, Input, Button, Radio, Select, Switch, Typography } from "antd";

import React, { Component } from "react";
import { connect } from "react-redux";
import { radioOption, selectOption } from "../constant";
import { searchByCondition, clearSearchResultList } from "../redux/store";
const { Title } = Typography;
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      searchInputTextValue: "",
      searchSwitchValue: false,
      searchSelectValue: null,
      searchRadioValue: null,
    };
  }

  handleChange = (value, stateName) => {
    this.setState({ [stateName]: value });
  };

  onSearchBtnClick = () => {
    this.props.searchByCondition(this.state);
  };

  onResetBtnClick = () => {
    this.setState({
      searchInputTextValue: "",
      searchSwitchValue: false,
      searchSelectValue: null,
      searchRadioValue: null,
    });
    this.props.clearSearchResultList();
  };

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 8,
      },
    };

    return (
      <div>
        <Title>條件搜尋</Title>
        <Form {...layout}>
          <Form.Item label="關鍵字">
            <Input
              value={this.state.searchInputTextValue}
              onChange={(e) => {
                this.handleChange(e.target.value, "searchInputTextValue");
              }}
            />
          </Form.Item>
          <Form.Item label="是否完成">
            <Switch
              checked={this.state.searchSwitchValue}
              onChange={(val) => {
                this.handleChange(val, "searchSwitchValue");
              }}
            />
          </Form.Item>
          <Form.Item label="緊急程度">
            <Select
              value={this.state.searchSelectValue}
              onChange={(val) => {
                this.handleChange(val, "searchSelectValue");
              }}
            >
              {selectOption.map((val) => {
                return (
                  <Select.Option value={val.value} key={val.value}>
                    {val.selectName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="喜好">
            <Radio.Group
              onChange={(e) => {
                this.handleChange(e.target.value, "searchRadioValue");
              }}
              value={this.state.searchRadioValue}
            >
              {radioOption.map((val) => {
                return (
                  <Radio value={val.value} key={val.value}>
                    {val.selectName}
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>
          <div>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                type="primary"
                htmlType="button"
                onClick={this.onSearchBtnClick}
              >
                Search
              </Button>
              <Button htmlType="button" onClick={this.onResetBtnClick}>
                Reset
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  searchByCondition,
  clearSearchResultList,
};
/*
const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    searchResultList: state.searchResultList,
  };
};
*/
export default connect(null, mapDispatchToProps)(SearchForm);