const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

function run() {
    // 1) Get some input values

    // We need to create a S3 bucket, with read permissions, enable the website hosting
    const bucket = core.getInput('bucket', { required: true});
    const bucketRegion = core.getInput('bucket-region', { required: true});
    const distFolder = core.getInput('dist-folder', { required: true});


    // 2) Upload my files
    const s3Uri = `s3://${bucket}`
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)
    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazon.aws.com`
    core.setOutput('website-url', websiteUrl)

    core.notice('Hello from my custom Javascript action')
}
run();