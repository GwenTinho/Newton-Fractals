"use strict";

import utils from "./modules/misc/utils";
import drawJPEG from "./modules/draw";
import settings from "./config.json";


drawJPEG(utils.getStatistics(settings));