=====================================================================================================

https://phppot.com/mango-ticker/

=====================================================================================================

Options	

PARAMETER	USAGE							TYPE		DEFAULT

speed		Defines animation speed of the ticker.			int		5
delay		Time between subsequent ticker items in milliseconds.	int		500
rotate		Loop through ticker items infinitely.			boolean		true







=====================================================================================================

https://codepen.io/donnchadh/pen/poyvzog

=====================================================================================================

<div class="ticker-wrap">
  <div class="ticker-heading">系統資訊</div>
<div class="ticker">
  <div class="ticker__item">
    <small class="badge rounded-pill status badge-soft-primary me-2"> 公告</small>Letterpress chambray brunch.
  </div>
  <div class="ticker__item">
    <small class="badge rounded-pill status badge-soft-primary me-2"> 公告</small>Vice mlkshk crucifix beard chillwave meditation hoodie asymmetrical Helvetica.
  </div>
  <div class="ticker__item">
    <small class="badge rounded-pill status badge-soft-primary me-2"> 公告</small>Ugh PBR&B kale chips Echo Park.
  </div>
  <div class="ticker__item">
    <small class="badge rounded-pill status badge-soft-primary me-2"> 公告</small>Gluten-free mumblecore chambray mixtape food truck. 
  </div>
</div>
</div>	


@-webkit-keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}
.ticker-heading {position: absolute; background: #A6C22F; display: block; left: 0; top: 0; height: 2.5rem; padding: 11px 40px; z-index: 2; color: white; text-transform: uppercase; font-size: 0.875rem;}

.ticker-wrap .ticker__item:before {content: ""; height: 11px; width: 11px; display: inline-block; background-color: #1074bc; border-radius: 100%; position: relative; margin-right: 15px;}

.ticker-heading:after {content: ""; width: 0; height: 0; border-top: 8px solid transparent; border-bottom: 8px solid transparent; border-left: 11px solid #A6C22F;
position: absolute; margin-left: 40px;}

.ticker-wrap {position: relative; bottom: 0; width: 100%; overflow: hidden;
  height: 2.5rem; background-color: #f9f9f9; padding-left: 100%; box-sizing: content-box;}
.ticker-wrap .ticker:hover {-webkit-animation-play-state: paused; -moz-animation-play-state: paused; -ms-animation-play-state: paused; -o-animation-play-state: paused; animation-play-state: paused;}
.ticker-wrap .ticker {display: inline-block; height: 2.5rem; line-height: 2.5rem;
  white-space: nowrap; padding-right: 100%; box-sizing: content-box; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear; animation-timing-function: linear;
  -webkit-animation-name: ticker; animation-name: ticker; -webkit-animation-duration: 30s; animation-duration: 30s;}
.ticker-wrap .ticker__item {display: inline-block; padding: 0 2rem; font-size: 0.875rem; color: #454545;}