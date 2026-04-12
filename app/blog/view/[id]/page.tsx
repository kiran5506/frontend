import WithLayout from '@/hoc/WithLayout'
import React from 'react'

const BlogView = () => {
  return (
    <section className="blog-section py-3">
        <div className="container">
            <div className="row pb-5">
            <div className="col-md-9">
                <div className="box-details">
                <img
                    src="assets/images/blog/blog_img.jpg"
                    alt=""
                    className="main-img"
                />
                </div>
                <div className="content">
                <div className="main-title">
                    <h2 className="text-uppercase">Blog Title Comes Here</h2>
                </div>
                <p className="blog_date">
                    <img src="assets/images/icons/calendar-icon.png" alt="" />
                    06-09-2024 | Admin
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                    gravida placerat dictum. Aliquam eu pellentesque diam. Vivamus
                    mauris urna, dictum vel elit a, tristique posuere quam. Integer
                    faucibus non nisl id ullamcorper. Fusce efficitur, sapien vitae
                    pharetra fermentum, massa nisl dictum leo, et ullamcorper nisl magna
                    in massa. Maecenas tempus neque in turpis sollicitudin, eget
                    interdum nibh condimentum. Ut vel lectus viverra, laoreet lorem
                    quis, imperdiet dolor. Suspendisse non est in risus pellentesque
                    tristique. Duis lacinia eros sit amet pharetra scelerisque. Nam ut
                    finibus risus, non volutpat nunc.
                </p>
                </div>
                <div className="main-title pt-5">
                <h2>Title Comes Here</h2>
                </div>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                gravida placerat dictum. Aliquam eu pellentesque diam. Vivamus mauris
                urna, dictum vel elit a, tristique posuere quam. Integer faucibus non
                nisl id ullamcorper. Fusce efficitur, sapien vitae pharetra fermentum,
                massa nisl dictum leo, et ullamcorper nisl magna in massa. Maecenas
                tempus neque in turpis sollicitudin, eget interdum nibh condimentum.
                Ut vel lectus viverra, laoreet lorem quis, imperdiet dolor.
                Suspendisse non est in risus pellentesque tristique. Duis lacinia eros
                sit amet pharetra scelerisque. Nam ut finibus risus, non volutpat
                nunc.
                </p>
                <ul className="mt-3 list">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Lorem ipsum dolor sit amet, consectetur.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                </ul>
                <div className="main-title pt-5">
                <h2>Title Comes Here</h2>
                </div>
                <p>
                Duis sit amet pharetra odio. Suspendisse potenti. Curabitur eget felis
                justo. Nam pharetra lorem ac nunc viverra tempor. Mauris eu dignissim
                diam. In mi velit, imperdiet id justo porta, volutpat consequat nisi.
                Phasellus velit sapien, pretium eu euismod sed, vehicula vitae dui.
                Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                per inceptos himenaeos.
                </p>
                <div className="main-title pt-5">
                <h4>Title Comes Here</h4>
                </div>
                <p>
                Duis sit amet pharetra odio. Suspendisse potenti. Curabitur eget felis
                justo. Nam pharetra lorem ac nunc viverra tempor. Mauris eu dignissim
                diam. In mi velit, imperdiet id justo porta, volutpat consequat nisi.
                Phasellus velit sapien, pretium eu euismod sed, vehicula vitae dui.
                </p>
            </div>
            <div className="col-md-3">
                <div className="related_posts ">
                <div className="head">
                    <h4>Related Posts</h4>
                </div>
                <div className="content">
                    <ul>
                    <li>
                        <a href="blog-view.php">Blog Title 1</a>
                    </li>
                    <li>
                        <a href="blog-view.php">Blog Title 2</a>
                    </li>
                    <li>
                        <a href="blog-view.php">
                        Lorem ipsum dolor sit amet, adipiscing elit. Phasellus...
                        </a>
                    </li>
                    <li>
                        <a href="blog-view.php">
                        Lorem ipsum dolor sit amet, adipiscing elit. Phasellus...
                        </a>
                    </li>
                    <li>
                        <a href="blog-view.php">
                        Lorem ipsum dolor sit amet, adipiscing elit. Phasellus...
                        </a>
                    </li>
                    <li>
                        <a href="blog-view.php">
                        Lorem ipsum dolor sit amet, adipiscing elit. Phasellus...
                        </a>
                    </li>
                    <li>
                        <a href="blog-view.php">
                        Lorem ipsum dolor sit amet, adipiscing elit. Phasellus...
                        </a>
                    </li>
                    <li>
                        <a href="blog-view.php">
                        Lorem ipsum dolor sit amet, adipiscing elit. Phasellus...
                        </a>
                    </li>
                    <li>
                        <a href="blog-view.php">
                        Lorem ipsum dolor sit amet, adipiscing elit. Phasellus...
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>

  )
}

export default WithLayout(BlogView, 'frontend')
