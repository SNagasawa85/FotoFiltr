import React, {useState} from 'react';
import ToolBarItem from './ToolBarItem';
import { useNavigate } from 'react-router-dom';
import Slider from './Slider';
import styles from '../styles/editor.module.css';


export default (props) => {
    
    const toolBar = [
        {
            name: 'Brightness',
            property: 'brightness',
            value: 100,
            range: {
                min: 0,
                max: 200,
            },
            unit: '%'
        },
        {
            name: 'Contrast',
            property: 'contrast',
            value: 100,
            range: {
                min: 0,
                max: 200,
            },
            unit: '%'
        },
        {
            name: 'Saturation',
            property: 'saturate',
            value: 100,
            range: {
                min: 0,
                max: 200,
            },
            unit: '%'
        },
        {
            name: 'Grayscale',
            property: 'grayscale',
            value: 0,
            range: {
                min: 0,
                max: 100,
            },
            unit: '%'
        },
        {
            name: 'Sepia',
            property: 'sepia',
            value: 0,
            range: {
                min: 0,
                max: 100,
            },
            unit: '%'
        },
        {
            name: 'Hue Rotate',
            property: 'hue-rotate',
            value: 0,
            range: {
                min: 0,
                max: 360,
            },
            unit: 'deg'
        },
        {
            name: 'Blur',
            property: 'blur',
            value: 0,
            range: {
                min: 0,
                max: 10,
            },
            unit: 'px'
        },
    ]
    const { url } = props;
    console.log(url);
    const setBGstring = "url('" + url + "')";
    const navigate = useNavigate();

    const [options, setOptions] = useState(toolBar);
    const [selectedOption, setSelectedOption] = useState(0);


    const selectedTool = options[selectedOption];

    const handleSliderChange = ({target}) => {
        setOptions(prevOptions => {
            return prevOptions.map((tool, idx)=> {
                if(idx !== selectedOption){
                    return tool;
                }
                return {...tool,value: target.value}
            })
        })
    };

    const newImageStyle = () => {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        let newstyle = {filter: filters.join(' ')};
        newstyle.backgroundImage = `url(${url})`;
        return newstyle;
    }

    const showHelp = () => {
        const pTwo = document.getElementById('pTwo');
        pTwo.style.transform = 'scaleY(0)';
        pTwo.style.transitionDuration = '0.1s';
        // open up the help div
        const helpGrab = document.getElementById('helpDiv');
        helpGrab.style.transform = 'scaleY(1)';
        helpGrab.style.transitionDuration = '0.8s';
        // apply border to slider bar
        const sliderDiv = document.getElementById('sliderBox');
        sliderDiv.style.borderColor = 'hotpink';
        const pOne = document.getElementById('pOne');
        pOne.style.transform = 'scaleY(1)'; 
        const toolDiv = document.getElementById('toolBox');
        toolDiv.style.borderColor = 'transparent';
    }

    const nextHelper = () => {
        // remove border from slider bar
        const sliderDiv = document.getElementById('sliderBox');
        sliderDiv.style.borderColor = 'transparent';
        // apply border to buttons
        const toolDiv = document.getElementById('toolBox');
        toolDiv.style.borderColor = 'hotpink';
        // switch paragraphs shown to coordinate with borders
        const pOne = document.getElementById('pOne');
        pOne.style.transform = 'scaleY(0)';
        pOne.style.transitionDuration = '0.8s';
        const pTwo = document.getElementById('pTwo');
        pTwo.style.transform = 'scaleY(1)';
        pTwo.style.transitionDuration = '0.8s';
    }

    const closeHelper = () => {
        // remove border from both slier and buttons
        const helpGrab = document.getElementById('helpDiv');
        helpGrab.style.transform = 'scaleY(0)';
        helpGrab.style.transitionDuration = '0.8s';
        const sliderDiv = document.getElementById('sliderBox');
        sliderDiv.style.borderColor = 'transparent';
        const toolDiv = document.getElementById('toolBox');
        toolDiv.style.borderColor = 'transparent';
        const pOne = document.getElementById('pOne');
        pOne.style.transform = 'scaleY(1)';        
        const pTwo = document.getElementById('pTwo');
        pTwo.style.transform = 'scaleY(0)';

    }

    const handleReset = () => {
        setOptions(toolBar)
    }

    const goHome = () => {
        navigate('/');
    }

    return (
        <>
        <div className={styles.mainContainer} >
            <div className={styles.imageContainer} id='image' style={newImageStyle()} > 
            </div>
            <div className={styles.titleContainer}>
                <p>F<br/>i<br/>l<br/>t<br/>e<br/>r</p>
                <p>oto</p>
            </div>
            

            <div className={styles.buttonContainer}>
                <button onClick={ goHome }>Home</button>
                <button onClick={ showHelp }>Help</button>
                <button onClick={ handleReset }>Reset</button>
                <button onClick={() => {alert('Save Feature Coming Soon!')}}>Save</button>
                
            </div>
            

            <div className={styles.toolbarContainer} id='toolBox'>
                {options.map((option, idx) => {
                    return (
                        <ToolBarItem
                        key={idx}
                        name={option.name}
                        active={idx === selectedOption}
                        handleClick={()=>setSelectedOption(idx)}  
                        />
                    )
                }
                )} 
            </div>

            <div className={styles.sliderContainer} id='sliderBox'>
                <Slider min={selectedTool.range.min} max={selectedTool.range.max} value={selectedTool.value} handleChange={ handleSliderChange }/>
            </div>
            
        </div>
        <div className={styles.helpDiv} id='helpDiv'>
            <p id='pOne' >This is the slider bar. Moving the tracker will adjust the intensity of the filter!</p>
            <br/>
            <p id='pTwo' >These buttons will select the effect being applied to the image. Apply and adjust as many or as few effects as you want!</p>
            <button id='nextBtn' onClick={ nextHelper }>Next</button>
            <button id='closeBtn' onClick={ closeHelper }>Got it!</button>
        </div>
    </>
    )
}