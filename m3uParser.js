const { DOMParser } = require('xmldom');

// ASX Parser
const ASX = (function() {
  const find = function(node, list) {
    if (node.hasChildNodes()) {
      const childNodes = node.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];
        const childNodeName = childNode.nodeName;
        if (/REF/i.test(childNodeName)) {
          const attributes = childNode.attributes;
          for (let x = 0; x < attributes.length; x++) {
            const match = attributes[x].nodeName.match(/HREF/i);
            if (match) {
              list.push({
                file: childNode.getAttribute(match[0]).trim()
              });
              break;
            }
          }
        } else if (childNodeName !== '#text') {
          find(childNode, list);
        }
      }
    }
    return null;
  };

  const parse = function(playlist) {
    const ret = [];
    const doc = (new DOMParser()).parseFromString(playlist, 'text/xml').documentElement;
    if (!doc) {
      return ret;
    }
    find(doc, ret);
    return ret;
  };

  return {
    name: 'asx',
    parse
  };
})();

// M3U Parser
const M3U = (function() {
  const EXTENDED = '#EXTM3U';
  const COMMENT_RE = /:(?:(-?\d+),(.+)\s*-\s*(.+)|(.+))\n(.+)/;

  const extended = function(line) {
    const match = line.match(COMMENT_RE);
    if (match && match.length === 6) {
      return {
        length: match[1] || 0,
        artist: match[2] || '',
        title: match[4] || match[3],
        file: match[5].trim()
      };
    }
  };

  const simple = function(string) {
    return {
      file: string.trim()
    };
  };

  const empty = function(line) {
    return !!line.trim().length;
  };

  const comments = function(line) {
    return line[0] !== '#';
  };

  const parse = function(playlist) {
    playlist = playlist.replace(/\r/g, '');
    const firstNewline = playlist.search('\n');

    if (playlist.startsWith(EXTENDED)) {
      playlist = playlist.replace(/(\n|^)([^#\n]+="[^"\n]*\?[^"\n]*")[^\n]*(\n|$)/g, '$1$3');
      return playlist.substr(firstNewline).split('\n#').filter(empty).map(extended);
    } else {
      return playlist.split('\n').filter(empty).filter(comments).map(simple);
    }
  };

  return {
    name: 'm3u',
    parse
  };
})();

// PLS Parser
const PLS = (function() {
  const LISTING_RE = /(file|title|length)(\d+)=(.+)\r?/i;

  const parse = function(playlist) {
    const tracks = [];
    const lines = playlist.trim().split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(LISTING_RE);
      if (match && match.length === 4) {
        const [_, key, index, value] = match;
        if (!tracks[index]) {
          tracks[index] = {};
        }
        tracks[index][key.toLowerCase()] = value;
      }
    }
    return tracks.filter(track => track != null);
  };

  return {
    name: 'pls',
    parse
  };
})();

// Unified Parser Interface
const PlaylistParser = (function() {
  const parsers = [ASX, M3U, PLS];

  const detectFormat = function(playlist) {
    if (playlist.startsWith('#EXTM3U')) {
      return 'm3u';
    } else if (playlist.includes('[playlist]')) {
      return 'pls';
    } else if (playlist.includes('<asx')) {
      return 'asx';
    } else {
      return null;
    }
  };

  const parse = function(playlist) {
    const format = detectFormat(playlist);
    if (!format) {
      throw new Error('Unsupported playlist format');
    }
    const parser = parsers.find(p => p.name === format);
    return parser.parse(playlist);
  };

  return {
    parse
  };
})();

module.exports = PlaylistParser;

// Example usage:
// const playlist = '...'; // Your playlist content
// const parsedData = PlaylistParser.parse(playlist);
// console.log(parsedData);
