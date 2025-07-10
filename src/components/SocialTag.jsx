function SocialTag({ name, link, icon }) {
    return (
        <div className="h-12 w-12">
            <a 
                className='h-full' 
                href={link} 
                target="_blank" 
                title={`View My ${name}`}
            >
                <img 
                    src={icon} 
                    alt={`${name} Profile`}
                    className='h-full hover:animate-bounce' 
                />
            </a>
        </div>
    )
}

export default SocialTag;