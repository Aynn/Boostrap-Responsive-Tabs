$(document).ready(function() {
  rTab();
});

$(window).resize(function() {
  rTab_resize();
});

function rTab()
{
    $('.nav-tabs').each(function() {

      var li = [];
      var le = [];

      var ddtab_w;

      var currentw = $(this).outerWidth();

      for(var i = 0; i < $(this)[0].children.length; i++)
      {
          li.push($(this)[0].children[i].outerHTML);
          le.push($(this)[0].children[i].offsetWidth);

          if(i == $(this)[0].children.length-1)
          {
              $(this)[0].children[i].innerHTML = "<a href='#' data-toggle='tab'> Tab ("+ (i+1) +")  <span class='caret'></span></a></a>";
              ddtab_w = $(this)[0].children[i].offsetWidth;
          }
      }

      var total_tabs = $(this)[0].children.length;
      var wTracker = 0;

      var tabs;

      $(this).html('');

      for(var i = 0; i < li.length; i++)
      {

          if((le[i] + wTracker) <= currentw)
          {
                wTracker += le[i];
                tabs = i;

                if (i == li.length-1)
                {
                    for(var i = 0; i < li.length; i++)
                    {
                        $(this).append(li[i]);
                    }
                }

            } else {

                        i = li.length-1;

                        while(ddtab_w + wTracker >= currentw)
                        {
                            wTracker -= le[tabs--];
                        }

                        if(tabs < 0) { tabs = 0; }

                        for(var x = 0; x < tabs; x++)
                        {
                            $(this).append(li[x]);
                        }

                        var dropdown_tabs = ddTab(total_tabs-tabs, "Tabs");

                        $(this)[0].appendChild(dropdown_tabs[0]);

                        wTracker += $(this)[0].children[$(this)[0].children.length-1].offsetWidth;

                        while(tabs<li.length)
                        {
                            dropdown_tabs[1].innerHTML += li[tabs++];
                        }

                   }
          }

          if($(this)[0].children[$(this)[0].children.length-1].classList[1] == "pull-right")
          {
              isActive(dropdown_tabs, $(this)[0].children[$(this)[0].children.length-1]);
          }


          if($(this)[0].children.length == 1)
          {
              dropdown_tabs[0].style.paddingLeft = "10px";
              dropdown_tabs[0].style.marginRight = "-10px";
              dropdown_tabs[0].style.textAlign = "center";
              dropdown_tabs[0].style.position = "relative";
              dropdown_tabs[0].style.width = "100%";
              dropdown_tabs[0].setAttribute("class","dropdown pull-right active");

              dropdown_tabs[1].style.left = "7px";

              dropdown_tabs[2].data = dropdown_tabs[1].children[0].innerText + " (" + dropdown_tabs[1].children.length + ")";

              $(dropdown_tabs[1]).click(function() {
                  dropdown_tabs[2].data =event.target.text + " (" + dropdown_tabs[1].children.length + ")";
              });
          }
    });
}

function rTab_resize()
{
    reset();
    rTab();
}

function reset()
{
    $('.nav-tabs').each(function() {

      if($(this)[0].children[$(this)[0].children.length-1].classList[1] == "pull-right")
      {
          var drop_down_tab = $(this)[0].children[$(this)[0].children.length-1].children[1];
          var initial_value =  drop_down_tab.children.length;

         for(var i = 0; i < initial_value; i++)
         {
             $(this).append(drop_down_tab.children[0]);
         }

         $(this)[0].children[$(this)[0].children.length-(1+initial_value)].remove();
      }

    });
}

function ddTab(total_dropdown, tabName)
{
      var n_li = document.createElement("li");
            n_li.setAttribute("class","dropdown pull-right");
            n_li.style.position = "relative";
            n_li.style.right = "13px";

      var n_a = document.createElement("a");
            n_a.setAttribute("class","dropdown-toggle");
            n_a.setAttribute("data-toggle","dropdown");
            n_a.setAttribute("href","#");

      var n_sp = document.createElement("span");
            n_sp.setAttribute("class","caret");

      var n_ul = document.createElement("ul");
            n_ul.setAttribute("class","dropdown-menu");

      var n_tx = document.createTextNode(tabName + " (" + total_dropdown + ")");

      n_a.appendChild(n_tx);
      n_a.appendChild(n_sp);

      n_li.appendChild(n_a);
      n_li.appendChild(n_ul);

      return [n_li, n_ul, n_tx];
}

function isActive(dropdown_tabs, child)
{
    for (var i = 0; i < dropdown_tabs[1].children.length; i++)
    {
        if(dropdown_tabs[1].children[i].classList[0] == "active")
        {
           child.setAttribute("class","dropdown pull-right active");
        }

    }
}
