<img src="https://www.grax.com/wp-content/uploads/2023/03/Profile-Yt-256x256.png" align="right" height="40" width="40" >

## GRAX Connector Framework

The GRAX Connector Framework is used by all GRAX connectors that need to execute snapshot reports to make them easily done. The goal is to ensure that all snapshot logic executed in all connectors is unified ensuring data experience is the same across multiple mediums. If you are updating the framework you must ```npm update``` packages below, test, and validate changes.

Salesforce has 1 version of data with GRAX you have 100% of your Salesforce history accessible in all applications listed below. Please view the [demonstration video](https://www.grax.com/blog/create-snapshot-reports-with-our-salesforce-excel-connector/) just how quickly you can use your Salesforce history.

### Supported Connectors
* [grax-connector-for-excel](https://github.com/graxlabs/grax-connector-for-excel/) - [Microsoft Excel Demonstration Video](https://www.grax.com/blog/create-snapshot-reports-with-our-salesforce-excel-connector/) - Released
* [grax-connector-for-tableau](https://github.com/graxlabs/grax-connector-for-tableau) - Released 
* [grax-connector-for-google](https://www.grax.com/blog/how-to-pull-data-from-salesforce-to-google-sheets/) - Released
* [grax-connector-for-snowflake](https://github.com/graxlabs/grax-connector-framework) - Development
* [grax-connector-for-powerbi](https://github.com/graxlabs/grax-connector-framework) - Development
* [grax-connector-for-outsystems](https://github.com/graxlabs/grax-connector-framework) - Development
* [grax-connector-for-synapse](https://github.com/graxlabs/grax-connector-framework) - Development
* [grax-connector-for-athena](https://github.com/graxlabs/grax-connector-framework) - Development

#### How to develop locally
git clone https://github.com/graxlabs/grax-connector-framework
cd grax-connector-framework
nvm use 18.2.0
npm install
export GRAX_URL=```<GRAXURL>```
export GRAX_TOKEN=```<GRAXTOKEN>```
node test.js





