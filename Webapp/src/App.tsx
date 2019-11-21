import React, {useEffect, useRef, useState} from 'react';
import DisplayMain from './DisplayMain'
import first from './images/1.jpg'
import second from './images/2.jpg'
import third from './images/3.jpg'
import fourth from './images/4.jpg'
import fifth from './images/5.jpg'
import sixth from './images/6.jpg'

import 'bootstrap/dist/css/bootstrap.min.css';

const base: string = 'HTTPs://pixabay.com/api/';
const login: string = "14273844-f456c7ec834d57f01df684ee6";


export interface singleItem {
    id: string,
    name: string,
    check: boolean,
}

const SSD = "ssd";

export default function App() {
    const [imagesAry, setImageArray] = useState(Array<string>());

    const getImages = async (typeOfImages: string) => {
        typeOfImages = typeOfImages.replace(" ", "+").toLowerCase();
        const response = await fetch(`${base}?key=${login}&q=${typeOfImages}`);
        const myJson = await response.json();
        parseImageBay(myJson);
    };
    const [onScreen, setOnScreen] = useState(0);

    const score = useRef() as React.MutableRefObject<HTMLInputElement>;


    const parseImageBay = (responseObject: any) => {
        if (responseObject !== null) {
            const allImages: [] = responseObject["hits"] as [];
            const count: number = allImages.length;
            const holder: Array<string> = [];
            for (let i = 0; i < count; i++) {
                const eachImage: string = allImages[i]["largeImageURL"];
                if (holder.indexOf(eachImage) === -1) {
                    holder.push(eachImage);
                }
            }
            setImageArray(old => {
                return [...holder];
            })
        }
    };
    useEffect(() => {
        const oldScore: string = localStorage.getItem(SSD) as string;
        if (parseInt(oldScore))
            setOnScreen(parseInt(oldScore));
        const getImage = async (typeOfImages: string) => {
            typeOfImages = typeOfImages.replace(" ", "+").toLowerCase();
            const response = await fetch(`${base}?key=${login}&q=${typeOfImages}`);
            const myJson = await response.json();
            parseImageBay(myJson);
        };
        getImage("abstract art").then();
        setImageArray(old => {
            return [first, second, third, fourth, fifth, sixth];
        })
    }, []);

    const removeGame = () => {
        if (score.current.style.display === "" || score.current.style.display === null) {
            score.current.style.display = "none";
        } else {
            score.current.style.display = "";
        }
    };
    const buttonRef1 = useRef() as React.MutableRefObject<HTMLInputElement>;
    const buttonRef2 = useRef() as React.MutableRefObject<HTMLInputElement>;


    const fixImg = () => {
        if (buttonRef1.current.checked || buttonRef2.current.checked) {
            setOnScreen(old => {
                old++;
                localStorage.setItem(SSD, String(old));
                return old;
            });
            buttonRef1.current.checked = false;
            buttonRef2.current.checked = false;
        }
    };

    const switchGenre = () => {
        const element: any = document.getElementById("selectGenre") as HTMLInputElement;
        getImages(element.options[element.selectedIndex].value).then(r => {
        });
    };

    return (
        <div className={"back"}>
            <h1>Welcome To Our Project for Computer Vision</h1>
            <h4>All images are free of CopyRight</h4>
            <h6>You can copy, modify, distribute, and use the images, even for
                commercial purposes, all without asking for permission or giving
                credits to the artist. However, depicted content may still be protected by trademarks,
                publicity or privacy rights.<a href="https://pixabay.com/service/faq/"> Pixabay 2019</a>
            </h6>
            <h4>Larry Ukaoma & Lu Jin</h4>
            <div>
                <h1 ref={score}>
                    Score: {onScreen % 11}
                </h1>
                <br/>
                Art Genre: <select id="selectGenre" onChange={switchGenre}>
                <option value="Abstract">Abstract</option>
                <option value="Classical art">Classical</option>
                <option value="Modern art">Modern</option>
                <option value="Pop art">Pop</option>
                <option value="Cubism">Cubism</option>
                <option value="Surrealism">Surrealism</option>

            </select>&nbsp;&nbsp;&nbsp;
                Game Mode: <select onChange={removeGame}>
                <option value="ON">On</option>
                <option value="Off">Off</option>
            </select>
                <h2>Please Select the Artwork you find most beautiful.</h2>
            </div>
            <div className="BothBoxes">
                <DisplayMain images={imagesAry} index={onScreen} buttonRef1={buttonRef1} buttonRef2={buttonRef2}/>
            </div>
            <br/><br/>
            <div>
                <input className="selector" onClick={fixImg} type='submit' value='Next =>'/>
            </div>
        </div>
    );
};
