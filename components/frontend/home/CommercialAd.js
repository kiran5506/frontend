import React from 'react'

const CommercialAd = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "var(--primary-color)" }}>
        <div className="container">
            <div className="main-title text-center">
            <h2 className="text-white mb-4">Commercial Ad</h2>
            </div>
            <div className="row d-flex justify-content-center">
            <div className="col-md-7" style={{ padding: 10 }}>
                <style
                dangerouslySetInnerHTML={{
                    __html:
                    ".embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }"
                }}
                />
                <div className="embed-container">
                <iframe
                    src="https://www.youtube.com/embed/wQquISGhUlQ"
                    frameBorder={0}
                    allowFullScreen=""
                />
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default CommercialAd
