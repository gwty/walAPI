import urllib.request
import json
import xml.etree.ElementTree as etree
import io 
from bottle import route, run, static_file

apiKey = 'ufureemfx7a3mzx4mr93xc82'
@route('/recommendations/<item_id>')
def recommendations(item_id):
    
    req = urllib.request.Request('http://api.walmartlabs.com/v1/nbp?itemId=' + item_id
    + '&format=xml&apiKey=' + apiKey)
    with urllib.request.urlopen(req) as response:
        the_page = response.read().decode('utf-8')
        
        xml = io.StringIO(the_page)
        xml_data = []
        tree = etree.parse(xml)  
        root = tree.getroot()
        for items in root:
            item_data = {}
            for item in items:
                item_data[item.tag] = item.text
            xml_data.append(item_data)

    json_data = json.dumps(xml_data)
    return json_data

@route('<filename:path>')
def serve_static_files(filename):
    return static_file(filename, root='static/')    
run(host='localhost', port=8080, debug=True)

