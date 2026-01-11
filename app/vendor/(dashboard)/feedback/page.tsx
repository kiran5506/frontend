import React from 'react'

const Feedback = () => {
  return (
    <div className="pad">
      <h2 className="page-title">Submit Feedback</h2>
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-sec">
              <div className="mb-3">
                <label className="form-label">Mobile*</label>
                <input
                  type="text"
                  className="form-control py-2 px-4 rounded-5"
                  placeholder="Enter Mobile Number"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Write brief your issue*</label>
                <textarea
                  className="form-control py-2 px-4 rounded-5"
                  rows={4}
                  placeholder=""
                  defaultValue={""}
                />
              </div>
              <button type="submit" className="btn orange-btn  rounded-5 px-4">
                Submit
              </button>
              <div className="alert alert-success text-center mt-3">
                We have received your information
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Feedback
