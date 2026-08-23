#!/usr/bin/env python3
"""
List all documents in Python
"""


def list_all(mongo_collection):
    """
    List all documents in a collection.

    Args:
        mongo_collection: the pymongo collection object

    Returns:
        list: a list of all documents in the collection, or an empty
        list if no document is in the collection.
    """
    return list(mongo_collection.find())
