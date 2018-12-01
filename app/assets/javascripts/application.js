import "babel-polyfill";

import ReactRailsUJS from "react_ujs";
import Turbolinks from "turbolinks";
import Rails from "rails-ujs";

import "./components";

Rails.start();
Turbolinks.start();
ReactRailsUJS.detectEvents();
ReactRailsUJS.mountComponents();
