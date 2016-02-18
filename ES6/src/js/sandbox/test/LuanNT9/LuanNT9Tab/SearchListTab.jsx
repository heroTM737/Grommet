import React, { Component } from 'react';
import SearchList from './../../../../widget/SearchList';
import Button from 'grommet/components/Button';
import LuanNT9Tab from './../LuanNT9Tab';

import './style.scss';

export default class SearchListTab extends Component{
  constructor () {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    // let url = "http://128.88.242.47:8080/web/ExampleData/LuanNT9/tree.json";
    //  this.loadDataAjax("");
  }

  loadDataAjax (url) {
    var tree = this;
    $.ajax({
       type: "GET",
       url: url,
       dataType: "text",
       cache : false,
       success: function (data) {
         console.log("success");
         var list = JSON.parse(data);

         tree.refs.searchlist.setState({
            data : list
         });
       },
       error : function (response) {
         console.log("error ");
         console.log(response.responseText);
       }
     });
  }

  render (){
    let searchlist = this;
    return(
      <div >
        <SearchList data={this.state.data} ref="searchlist"/>
      </div>
    );
  }
};

export default SearchListTab;
