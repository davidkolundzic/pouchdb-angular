export const JOB = {
    _id: 'job_001',
    serviceDate: '2018-02-03',
    customer: '834',
    technician: {
        EmployeId: '1023',
        name: 'Sheriff, Paul'
    },
    workDone: [{
        description: 'Driveway repair',
        price: 225
    }]
};
export const BULK_DOCS = [
    {
        '_id': 'job_2010',
        'serviceDate': '2018-02-03',
        'customer': '834',
        'technician': {
            'EmployeeID': '1023',
            'name': 'Sheriff, Paul'
        },
        'workDone': [{
            'description': 'Driveway repair',
            'price': 225
        }]
    },
    {
        '_id': 'job_2011',
        'serviceDate': '2018-02-03',
        'customer': '834',
        'technician': {
            'EmployeeID': '1023',
            'name': 'Sheriff, Paul'
        },
        'workDone': [{
            'description': 'Carport repair',
            'price': 150
        }]
    },
    {
        '_id': 'job_2020',
        'serviceDate': '2018-02-03',
        'customer': '452',
        'technician': {
            'EmployeeID': '1034',
            'name': 'Sheriff, Madison'
        },
        'workDone': [{
            'description': 'Drywall installation',
            'price': 500
        },
        {
            'description': 'Painting',
            'price': 100
        }]
    },
    {
        '_id': 'job_2030',
        'serviceDate': '2018-02-04',
        'customer': '651',
        'technician': {
            'EmployeeID': '1051',
            'name': 'Jones, Bruce'
        },
        'workDone': [{
            'description': 'Lawn mowing',
            'price': 100
        }]
    },
    {
        '_id': 'job_2040',
        'serviceDate': '2018-03-05',
        'customer': '834',
        'technician': {
            'EmployeeID': '1189',
            'name': 'Kuhn, John'
        },
        'workDone': [{
            'description': 'Install doorbell',
            'price': 75
        }]
    },
    {
        '_id': 'job_2050',
        'serviceDate': '2018-03-06',
        'customer': '983',
        'technician': {
            'EmployeeID': '1023',
            'name': 'Sheriff, Paul'
        },
        'workDone': [{
            'description': 'Drywall repair',
            'price': 95
        },
        {
            'description': 'Painting',
            'price': 50
        }]
    },
    {
        '_id': 'job_2060',
        'serviceDate': '2018-04-08',
        'customer': '389',
        'technician': {
            'EmployeeID': '1189',
            'name': 'Kuhn, John'
        },
        'workDone': [{
            'description': 'Ceiling fan install',
            'price': 150
        }]
    },
    {
        '_id': 'invoice_2534',
        'invoiceDate': '2018-02-04',
        'invoiceTotal': 375,
        'customer': {
            '_id': '834',
            'name': 'John Smith',
            'address': '123 Main Street',
            'city': 'Nashville',
            'state': 'TN',
            'postalCode': '37211'
        },
        'lineItems': [
            {
                'jobId': 'job_2010',
                'description': 'Driveway repair',
                'price': 225
            },
            {
                'jobId': 'job_2011',
                'description': 'Carport repair',
                'price': 150
            }
        ]
    },
    {
        '_id': 'invoice_2536',
        'invoiceDate': '2018-02-04',
        'invoiceTotal': 600,
        'customer': {
            '_id': '452',
            'name': 'Henry James',
            'address': '98 5th Ave',
            'city': 'Brentwood',
            'state': 'TN',
            'postalCode': '37027'
        },
        'lineItems': [
            {
                'jobId': 'job_2020',
                'description': 'Drywall installation',
                'price': 500
            },
            {
                'jobId': 'job_2020',
                'description': 'Painting',
                'price': 100
            }
        ]
    },
    {
        '_id': 'invoice_2537',
        'invoiceDate': '2018-02-05',
        'invoiceTotal': 100,
        'customer': {
            '_id': '651',
            'name': 'Grant Able',
            'address': '113 Woods Lane',
            'city': 'Brentwood',
            'state': 'TN',
            'postalCode': '37027'
        },
        'lineItems': [
            {
                'jobId': 'job_2030',
                'description': 'Lawn mowing',
                'price': 100
            }
        ]
    },
    {
        '_id': 'invoice_2538',
        'invoiceDate': '2018-03-06',
        'invoiceTotal': 75,
        'customer': {
            '_id': '843',
            'name': 'John Smith',
            'address': '123 Main Street',
            'city': 'Nashville',
            'state': 'TN',
            'postalCode': '37211'
        },
        'lineItems': [
            {
                'jobId': 'job_2040',
                'description': 'Install doorbell',
                'price': 75
            }
        ]
    },
    {
        '_id': 'invoice_2539',
        'invoiceDate': '2018-03-07',
        'invoiceTotal': 145,
        'customer': {
            '_id': '983',
            'name': 'Mike Tinder',
            'address': '8733 Mockingbird Street',
            'city': 'Franklin',
            'state': 'TN',
            'postalCode': '37064'
        },
        'lineItems': [
            {
                'jobId': 'job_2050',
                'description': 'Drywall Repair',
                'price': 95
            },
            {
                'jobId': 'job_2050',
                'description': 'Painting',
                'price': 50
            }
        ]
    },
    {
        '_id': 'invoice_2540',
        'invoiceDate': '2018-02-06',
        'invoiceTotal': 150,
        'customer': {
            '_id': '389',
            'name': 'Sally Sherland',
            'address': '11 14th Avenue',
            'city': 'Nashville',
            'state': 'TN',
            'postalCode': '37211'
        },
        'lineItems': [
            {
                'jobId': 'job_2060',
                'description': 'Ceiling fan install',
                'price': 150
            }
        ]
    }
]

