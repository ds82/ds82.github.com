var github = (function(){
  function render(target, repos){
    var i = 0, fragment = '', t = $(target)[0];

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+(repos[i].description||'')+'</p></li>';
    }
    t.innerHTML = fragment;
  }

  function error( err, options ) {
    $(options.target + ' li.loading').addClass('error').text("Error loading feed");
  }

  return {
    showRepos: function(options){
      $.ajax({
          url: "https://api.github.com/users/"+options.user+"/repos"
        , dataType: 'jsonp'
        , crossDomain: true
        , error: function( err ) { error( err, options ); }
        , success: function(data) {
          
          console.log( data );

          if ( data.meta && data.meta.status && data.meta.status !== 200 ) {
            return error( null, options );
          }

          var repos = [];
          if (!data || !data.data) { return; }
          for (var i = 0; i < data.data.length; i++) {
            if (options.skip_forks && data.data[i].fork) { continue; }
            repos.push(data.data[i]);
          }
          repos.sort(function(a, b) {
            var aDate = new Date(a.pushed_at).valueOf(),
                bDate = new Date(b.pushed_at).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

          if (options.count) { repos.splice(options.count); }
          render(options.target, repos);
        }
      });
    }
  };
})();
