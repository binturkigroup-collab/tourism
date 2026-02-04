import {Service} from "typedi";

@Service()
class AnimationService {
    maxZoomScale = 1.3;
    minZoomScale = 1;


}

export default AnimationService;
