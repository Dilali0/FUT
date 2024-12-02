const CoverCombo  =  new TomSelect('#CoverCombo',{
    valueField: 'img',
    labelField: 'img',
    searchField: 'name',
    // fetch remote data
    load: function(query, callback) {
  
      fetch('./card.json')
        .then(response => response.json())
        .then(json => {
          callback(json);
        }).catch(()=>{
          callback();
        });
  
    },
    // custom rendering functions for options and items
    render: {
      option: function(item) {
        return `<div  class="custom-option ">
            <img  src="${item.img}" >
            <span >${item.name}</span>
          </div>`;
      },
      item: function(item) {
        return `<div  style="background-color:#495057;"  id="Flaginput" class="custom-option">
            <img id="imgCoverCombo"  src="${item.img}" >
            <span>${item.name}</span>
          </div>`;
      }
    },
  });
const flag  =  new TomSelect('#flag',{
    valueField: 'name',
    labelField: 'name',
    searchField: 'name',
    // fetch remote data
    load: function(query, callback) {
  
      fetch('../../nation.json')
        .then(response => response.json())
        .then(json => {
          callback(json);
        }).catch(()=>{
          callback();
        });
  
    },
    // custom rendering functions for options and items
    render: {
      option: function(item) {
        return `<div class="custom-option ">
            <img  src="${item.img}" >
            <span>${item.name}</span>
          </div>`;
      },
      item: function(item) {
        return `<div id="Flaginput" class="custom-option" style="diplay:flex">
            <img id="imgflag" src="${item.img}" >
            <span id="titleflag">${item.name}</span>
          </div>`;
      }
    },
  });
const club  = new TomSelect('#club',{
    valueField: 'name',
    labelField: 'name',
    searchField: 'name',
    // fetch remote data
    load: function(query, callback) {
  
      fetch('../../clubs.json')
        .then(response => response.json())
        .then(json => {
          callback(json);
        }).catch(()=>{
          callback();
        });
  
    },
    // custom rendering functions for options and items
    render: {
      option: function(item) {
        return `<div class="custom-option ">
            <img  src="${item.img}" >
            <span>${item.name}</span>
          </div>`;
      },
      item: function(item) {
        return `<div id="Flaginput" class="custom-option">
            <img id="imgclub" src="${item.img}" >
            <span id="titleclub"  >${item.name}</span>
          </div>`;
      }
    },
  });