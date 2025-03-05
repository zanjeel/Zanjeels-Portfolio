import ScrollVelocity from './ui/ScrollVelocity';
import RotatingButton from './ui/RotatingButton';
import FlowingMenu from './ui/FlowingMenu';
const Footer2= ()=>{

    const demoItems = [
        { link: 'https://www.linkedin.com/in/zanjeel-tariq-sahi/', text: 'LinkedIn', image: 'https://picsum.photos/600/400?random=1' },
        { link: 'https://github.com/zanjeel', text: 'Github', image: 'https://picsum.photos/600/400?random=2' },
        { link: 'https://www.tiktok.com/@zeej.codes', text: 'TikTok', image: 'https://picsum.photos/600/400?random=3' },
        { link: 'https://www.instagram.com/zeej.codes/', text: 'Instagram', image: 'https://picsum.photos/600/400?random=4' }
    ];

return(
    <div className='relative mt-24'>
    <ScrollVelocity
        texts='Follow Me'
        velocity={100}
        className="custom-scroll-text"
    />
    {/* <RotatingButton/> */}
        <div className='-mt-40' style={{ height: '600px', position: 'relative' }}>
            <FlowingMenu items={demoItems} />
        </div>
    </div>
)

}

export default Footer2