<img src="https://www.grax.com/wp-content/uploads/2023/03/Profile-Yt-256x256.png" align="right" height="40" width="40" >

## GRAX Connector Framework
Salesforce has 1 version of data with GRAX you have 100% of your Salesforce history accessible in all applications listed below. Please view the [demonstration video](https://www.grax.com/blog/create-snapshot-reports-with-our-salesforce-excel-connector/) just how quickly you can use your Salesforce history. GRAX history can be used to build Salesforce Historical Pipeline Reports, Salesforce Historical Case/Support Volume & Capacity Usage, Salesforce Historical Order Velocity/Volume/etc.

The GRAX Connector Framework is used by all GRAX connectors to execute snapshot reports to make them quickly and easily done. The goal is to ensure that all snapshot logic executed in all connectors is unified ensuring data experience is the same across multiple mediums. If you are updating the framework you must ```npm update``` packages below, test, and validate changes. Please use issues above to report any exceptions, bugs, and requests. If you would like to Collect, Protect, and reuse your Salesforce History please email [Sales@grax.com](mailto:sales@grax.com?subject=GRAX%20Connector%20Framework%20Request). Salesforce history can be reused in any and every application quickly and easily.

### Sample Business Cases
* [Using Customer Service Analytics to Reduce Churn and Costs](https://www.grax.com/blog/using-customer-service-analytics-to-reduce-churn-and-costs/)
* [Create Snapshot Reports With Our Salesforce Excel Connector](https://www.grax.com/blog/create-snapshot-reports-with-our-salesforce-excel-connector/)
* [Improving Customer Experience Insights and Loyalty](https://www.grax.com/blog/improving-customer-experience-insights-and-loyalty/)
* [Transform Your Salesforce Reporting and Elevate Your Sales Data Analysis with GRAX for Excel](https://www.grax.com/blog/create-snapshot-reports-with-our-salesforce-excel-connector/)


### Supported Connectors
* [grax-connector-for-excel](https://github.com/graxlabs/grax-connector-for-excel/) - [Microsoft Excel Demonstration Video](https://www.grax.com/blog/create-snapshot-reports-with-our-salesforce-excel-connector/) - Released
* [grax-connector-for-tableau](https://github.com/graxlabs/grax-connector-for-tableau) - Released 
* [grax-connector-for-google](https://www.grax.com/blog/how-to-pull-data-from-salesforce-to-google-sheets/) - Released
* [grax-connector-for-snowflake](https://github.com/graxlabs/grax-connector-framework) - Development
* [grax-connector-for-powerbi](https://github.com/graxlabs/grax-connector-framework) - Development
* [grax-connector-for-outsystems](https://github.com/graxlabs/grax-connector-framework) - Development
* [grax-connector-for-synapse](https://github.com/graxlabs/grax-connector-framework) - Development
* [grax-connector-for-athena](https://github.com/graxlabs/grax-connector-framework) - Development

#### Getting Started
If you would like to collect, protect, and reuse all your Salesforce history it takes minutes. GRAX can be deployed to AWS, Azure, GCP, or Docker and will collect 100% of your Salesforce history for reuse in any of the supported connectors above. If you have any questions please email [Sales@grax.com](mailto:sales@grax.com?subject=GRAX%20Connector%20Framework%20Request)

* [https://www.grax.com/](https://www.grax.com/)
* [Login to GRAX](https://platform.grax.com/)
    * [Deploy GRAX to Azure](https://documentation.grax.com/docs/azure-connection)
    * [Deploy GRAX to AWS](https://documentation.grax.com/docs/platform-basics#deploying-a-grax-application)
    * [Deploy GRAX to Docker](https://documentation.grax.com/docs/docker-desktop-install)
* [Connect GRAX to Salesforce](https://documentation.grax.com/docs/connecting-salesforce)
* [Start Auto Backup](https://documentation.grax.com/docs/auto-backup) 

#### Development 
```
git clone https://github.com/graxlabs/grax-connector-framework
cd grax-connector-framework
nvm use 18.2.0
npm install
export GRAX_URL=https://sample-url-1234.secure.grax.io
export GRAX_TOKEN=grax_token_ThisIsASampleTokenAbCdEfGhIjKlMnoPqRsTuVwXyZ
node sample.js
```




