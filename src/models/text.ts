import Leaf from "./leaf";
import MODEL_TYPES from "../constants/model-types";

class Text {
    key: string | null = null;
    leaves: Leaf[] = [];

    get object(){
        return 'text';
    }

    constructor(props: any){
        let { key = null, leaves = [] } = props;
        this.key = key;
        this.leaves = leaves;

        this[MODEL_TYPES.TEXT] = true;
    }

    static isText(obj: any){
        return !!(obj && obj[MODEL_TYPES.TEXT])
    }

    get isText(){
        return !!(this && this[MODEL_TYPES.TEXT])
    }

}

export default Text;