export function MapLink() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
    const googleMapUrl = `https://maps.google.com/?q=${encodeURIComponent("Mayberry+Mini+Trucks")}&ll=${"36.4539711"},${"-80.7432165"}`;
    const appleMapUrl = `https://maps.apple.com/?address=407%20Snow%20Ln,%20Mount%20Airy,%20NC%20%2027030,%20United%20States&auid=8880569998824803380&ll=36.453515,-80.741642&lsp=9902&q=Mayberry%20Mini%20Trucks%20Inc`;
    
    const mapUrl = isIOS ? appleMapUrl : googleMapUrl;
  
    return (
      <a href={mapUrl} target="_blank" rel="noopener noreferrer">
        407 Snow Lane Mt Airy, NC 27030
      </a>
    );
  };