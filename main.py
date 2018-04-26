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
        response_xml = response.read().decode('utf-8')
        
        xml = io.StringIO(response_xml)
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

@route('/search/<search_string>')
def search(search_string):
    
    req = urllib.request.Request("http://api.walmartlabs.com/v1/search?query=+" + search_string + "&format=json&apiKey=" +apiKey)
    with urllib.request.urlopen(req) as response:
        response_json = response.read()
        JSON_object = json.loads(response_json.decode('utf-8'))

    return json.dumps(JSON_object)

@route('/lookup/<item_id>')
def lookup(item_id):
    
    req = urllib.request.Request("http://api.walmartlabs.com/v1/items/" + item_id + "?format=json&apiKey=" +apiKey)
    with urllib.request.urlopen(req) as response:
        response_json = response.read().decode("utf-8");
        JSON_object = json.loads(response_json)
        
    return json.dumps(JSON_object)

@route('<filename:path>')
def serve_static_files(filename):
    return static_file(filename, root='static/')    
run(host='localhost', port=8080, debug=True)

