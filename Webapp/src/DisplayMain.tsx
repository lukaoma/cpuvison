import React from 'react';
import Selection from "./Selection";

export default function DisplayMain(props: any) {
    const values: Array<number> = [2];

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function updateIndex(max: number) {
        values[0] = getRandomInt(max);
        let next1: number = getRandomInt(max);
        let next2: number = getRandomInt(max);
        let loop: number = 50;
        // not doing what i think
        loop = 50;
        while ((next1 === next2) && loop) {
            next2 = getRandomInt(max);
            loop--;
        }
        values[0] = next1;
        values[1] = next2;
        return 1;
    }

    function inBounds(index: number, arry: []) {
        return index % arry.length;
    }

    const img1: string = props.images[inBounds(updateIndex(props.images.length) * values[0], props.images)];
    const img2: string = props.images[inBounds(values[1], props.images)];
    return (
        <table>
            <div className="singleBox">
                <tr>
                    <td>
                        <div className="mainBox">
                            <img className={"img"} src={img1} alt="##"/>
                            <Selection buttonRef={props.buttonRef1}/>
                        </div>
                    </td>
                    <td>
                        <div className="mainBox">
                            <img className={"img"} src={img2} alt="##"/>
                            <Selection buttonRef={props.buttonRef2}/>
                        </div>
                    </td>
                </tr>
            </div>
        </table>
    )
}
