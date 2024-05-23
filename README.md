<img src="https://www.grax.com/wp-content/uploads/2023/03/Profile-Yt-256x256.png" align="right" height="40" width="40" >

## GRAX Data Connectors Framework: Salesforce Data Integration

### Overview

The GRAX Data Connector Framework revolutionizes how organizations can access and analyze Salesforce data. With GRAX, you gain a comprehensive view of your Salesforce history — up to every version of data — making 100% of your data accessible across various downstream applications for analytics, AI, ML, and more. GRAX Data Connectors support global brands in making data-driven decisions by making their entire history available for detailed historical insights and facilitating robust data movement and data synchronization.

#### Key Features

* Historical Data Access: Unlike Salesforce which offers only a single snapshot, GRAX allows you to access and leverage your complete Salesforce data history for deeper and more accurate analysis.
* Data Integrity and Movement: Ensure the integrity and seamless movement of large amounts of data with GRAX’s advanced data connectors, minimizing human error and enhancing data quality.
* Support for Multiple Destinations: Connect your replicated data from Salesforce to any target system, including industry-standard analytics / AI / ML tools, data warehouses, data lakes, and cloud-based systems, ensuring comprehensive data availability.

### GRAX API

The GRAX Connector Framework is a javascript wrapper to the [GRAX API](https://apidocs.grax.io/) to ease the burden of tightly incorporating Salesforce historical snapshots into any and every application. This connector framework acts as a proxy for connector logic to the [GRAX API's](https://apidocs.grax.io/) reducing the friction, barrier, and time to release connectors. The GRAX Connector Framework is utilized by GRAX developed connectors as well as partner developed connectors.

This framework is used by all GRAX Data Connectors to easily and quickly execute historical snapshot reports. The goal is to ensure that all snapshot logic executed in all data connectors is unified ensuring the data experience is the same across multiple mediums. If you are updating the framework you must utilize ```npm update``` packages below, and then test/validate changes. Please use ```issues``` above to report any exceptions, bugs, or requests. 

### Demo Videos

Salesforce has only a single version of data, while GRAX gives you 100% of your Salesforce history that’s fully accessible in any application supported by GRAX API, GRAX Data Connectors, or Parquet format. Please review our resources to see GRAX in action:
* [GRAX for Excel Data Connector Demo Video](https://www.grax.com/blog/create-snapshot-reports-with-our-salesforce-excel-connector/) 
* [GRAX for Google Sheets Data Connector Demo Video](https://www.grax.com/blog/how-to-pull-data-from-salesforce-to-google-sheets/) 
* [GRAX for Tableau Data Connector Demo Video](https://www.grax.com/blog/harnessing-grax-tableau-connectors-for-advanced-analytics/) 

### Use Cases

GRAX history can be used to build Salesforce historical sales pipeline reports, Salesforce historical case/support volume and capacity changes, Salesforce historical order velocity/volume, and much more. GRAX is the ultimate time machine for your Salesforce data. 

* [Using Customer Service Analytics to Reduce Churn and Costs](https://www.grax.com/blog/using-customer-service-analytics-to-reduce-churn-and-costs/)
* [Create Snapshot Reports With Our Salesforce Excel Connector](https://www.grax.com/blog/create-snapshot-reports-with-our-salesforce-excel-connector/)
* [Improving Customer Experience Insights and Loyalty](https://www.grax.com/blog/improving-customer-experience-insights-and-loyalty/)
* [Transform Your Salesforce Reporting and Elevate Your Sales Data Analysis with GRAX for Excel](https://www.grax.com/blog/create-snapshot-reports-with-our-salesforce-excel-connector/)

If you would like to protect, pipe, and consume your Salesforce history, please contact [sales@grax.com](mailto:sales@grax.com?subject=GRAX%20Connector%20Framework%20Request). Salesforce history can be reused in any and every application with clicks, not code.

### Supported GRAX Data Connectors for Salesforce Data

* [GRAX Data Connector for Excel](https://github.com/graxlabs/grax-connector-for-excel/)- Released
* [GRAX Data Connector for Tableau](https://github.com/graxlabs/grax-connector-for-tableau) - Released 
* [GRAX Data Connector for Google Sheets](https://www.grax.com/blog/how-to-pull-data-from-salesforce-to-google-sheets/) - Released
* [GRAX Data Connector Snowflake](https://github.com/graxlabs/grax-connector-framework) - Development
* [GRAX Data Connector for PowerBI](https://github.com/graxlabs/grax-connector-framework) - Development
* [GRAX Data Connector Outsystems](https://github.com/graxlabs/grax-connector-framework) - Development
* [GRAX Data Connector for Azure Synapse](https://github.com/graxlabs/grax-connector-framework) - Development
* [GRAX Data Connector for AWS Athena](https://github.com/graxlabs/grax-connector-framework) - Development

#### Getting Started
GRAX can be deployed to your AWS, Azure, GCP, or Docker. It will collect 100% of your Salesforce history for reuse in any of the supported connectors above. If you have any questions please email [sales@grax.com](mailto:sales@grax.com?subject=GRAX%20Connector%20Framework%20Request).

**Resources**

* [GRAX Website](https://www.grax.com/)
* [GRAX Platform Login](https://platform.grax.com/)
    * [Deploy GRAX to Azure](https://documentation.grax.com/docs/azure-connection)
    * [Deploy GRAX to AWS](https://documentation.grax.com/docs/platform-basics#deploying-a-grax-application)
    * [Deploy GRAX to Docker](https://documentation.grax.com/docs/docker-desktop-install)
* [Connect GRAX to Salesforce](https://documentation.grax.com/docs/connecting-salesforce)
* [Start Backups](https://documentation.grax.com/docs/auto-backup) 

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
